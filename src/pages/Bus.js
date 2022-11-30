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
import Loading from '../components/Loading'

let busStop = []
let busLocation = []

const Item = ({ busStopName, id }) => {
    return (
        <TouchableOpacity
            style={styles.routeItemContainer}
            onPress={() => null}
        >
            {
                (busLocation.includes(id))
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
            <Text style={styles.routeText}>{busStopName}</Text>
        </TouchableOpacity>
    )
}

const renderItem = ({ item }) => (
    <Item 
        busStopName={item.busStopName} 
        id={item.id} 
    />
)

const Bus = ({ route }) => {
    const busNum = route.params.bus_num
    const busCode = route.params.bus_code
    const cityCode = JSON.parse(JSON.stringify(busCode.slice(0,3)))
    const [currentStopId, setCurrentStopId] = useState(0)

    const [isLoadingList, setIsLoadingList] = useState(true)
    const [isLoadingLocation, setIsLoadingLocation] = useState(true)
    const [isLoadingCurrentStopId, setIsLoadingCurrentStopId] = useState(true)

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
        .then((datas) => busStop = datas)
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingList(false))

        fetch('http://localhost:52273/getAllBusLocation', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                busNum: busNum,
            }),
        })
        .then((res) => { return res.json() })
        .then((datas) => {
            busLocation = []
            datas.forEach((data) => {
                busLocation.push(data.currentid)
            })
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingLocation(false))

        fetch('http://localhost:52273/getCurrentStopId', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                busNum: busNum,
                busCode: busCode,
            }),
        })
        .then((res) => { return res.json() })
        .then((data) => setCurrentStopId(data[0].currentid))
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingCurrentStopId(false))
    }, [])

    if(isLoadingCurrentStopId || isLoadingList || isLoadingLocation) {
        return (
            <Loading />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* 버스 정보 */}
            <View style={styles.busInfoContainer}>
                <View>
                    <Text style={styles.busInfoText}>이번 정류장</Text>
                    <Text style={styles.busInfoBusNameText}>{
                        busStop[busStop.findIndex((obj) => obj.id == currentStopId)].busStopName
                    }</Text>
                </View>
                <View>
                    <Text style={styles.busInfoBusNumText}>{busNum}</Text>
                </View>
            </View>

            {/* 버스 노선도 및 현황 */}
            <FlatList
                data = {busStop}
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