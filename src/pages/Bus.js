import React, {useEffect,useState} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

let busStop = []

const DATA = [
    {
        id: 1,
        busStopName: '1번째 정류장',
        status: 0,
    },
    {
        id: 2,
        busStopName: '2번째 정류장',
        status: 0,
    },
    {
        id: 3,
        busStopName: '3번째 정류장',
        status: 0,
    },
    {
        id: 4,
        busStopName: '4번째 정류장',
        status: 1,
    },
    {
        id: 5,
        busStopName: '5번째 정류장',
        status: 0,
    },
    {
        id: 6,
        busStopName: '6번째 정류장',
        status: 0,
    },
    {
        id: 7,
        busStopName: '7번째 정류장',
        status: 0,
    },
    {
        id: 8,
        busStopName: '8번째 정류장',
        status: 0,
    },
    {
        id: 9,
        busStopName: '9번째 정류장',
        status: 1,
    },
    {
        id: 10,
        busStopName: '10번째 정류장',
        status: 0,
    },
    {
        id: 11,
        busStopName: '11번째 정류장',
        status: 0,
    },
    {
        id: 12,
        busStopName: '12번째 정류장',
        status: 0,
    },
    {
        id: 13,
        busStopName: '13번째 정류장',
        status: 1,
    },
    {
        id: 14,
        busStopName: '14번째 정류장',
        status: 0,
    },
]

//const Item = ({ busStopName, status }) => {
const Item = ({ busStopName, id }) => {
    return (
        <TouchableOpacity
            style={styles.routeItemContainer}
            onPress={() => null}
        >
            {
                (id == 4)
                ?
                <Image
                    style={styles.busIcon}
                    source={require('../assets/img/bus.png')}
                />
                :
                <Image
                    style={styles.circleIcon}
                    source={require('../assets/img/circle.png')}
                />
            }
            {/* {
                (status == 1)
                ?
                <Image
                    style={styles.busIcon}
                    source={require('../assets/img/bus.png')}
                />
                :
                <Image
                    style={styles.circleIcon}
                    source={require('../assets/img/circle.png')}
                />
            } */}
            <Text style={styles.routeText}>{busStopName}</Text>
        </TouchableOpacity>
    )
}

const renderItem = ({ item }) => (
    <Item busStopName={item.busStopName} id={item.id}
    //status={item.status} 
    />
)

const Bus = ({ route }) => {
    const busNum = route.params.bus_num
    const busCode = route.params.bus_code
    const cityCode = JSON.parse(JSON.stringify(busCode.slice(0,3)))

    useEffect(() => {
        fetch('http://localhost:52273/getBusStopList', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                busNum: busNum,
                cityCode: cityCode,
            }),
        })
        .then((res) => { return res.json() })
        .then((datas) => {
            datas = JSON.parse(JSON.stringify(datas).slice(1,JSON.stringify(datas).length-1))
            datas = JSON.parse(JSON.stringify(datas.route))
            datas.split(', ').forEach((data) => {
                data = data.split(':')
                data[0] = data[0].substring(1)
                data[1] = data[1].substring(0,data[1].length-1)
                busStop.push({id:data[0], busStopName:data[1]})
            })
        })
        .catch((error) => console.log(error))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/* 버스 정보 */}
            <View style={styles.busInfoContainer}>
                <View>
                    <Text style={styles.busInfoText}>이번 정류장</Text>
                    <Text style={styles.busInfoBusNameText}>4번째 정류장</Text>
                </View>
                <View>
                    <Text style={styles.busInfoBusNumText}>{busNum}</Text>
                </View>
            </View>

            {/* 버스 노선도 및 현황 */}
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFF',
    },
    busInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: 'lightgray',
        padding: 20,
    },
    busInfoText: {
        fontSize: 14,
    },
    busInfoBusNameText: {
        fontSize: 17,
    },
    busInfoBusNumText: {
        fontSize: 35,
    },
    routeItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        marginLeft: 30,
    },
    circleIcon: {
        height: 20,
        width: 20,
        marginRight: 20,
    },
    busIcon: {
        height: 20,
        width: 20,
        marginRight: 20,
    },
    routeText: {
        fontSize: 20,
    },
})

export default Bus