import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

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

const Item = ({ busStopName, status }) => {
    return (
        <TouchableOpacity
            style={styles.routeItemContainer}
            onPress={() => null}
        >
            {
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
            }
            <Text style={styles.routeText}>{busStopName}</Text>
        </TouchableOpacity>
    )
}

const renderItem = ({ item }) => (
    <Item busStopName={item.busStopName} status={item.status} />
)

const Bus = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* 버스 정보 */}
            <View style={styles.busInfoContainer}>
                <View>
                    <Text style={styles.busInfoText}>이번 정류장</Text>
                    <Text style={styles.busInfoBusNameText}>동아대 입구</Text>
                </View>
                <View>
                    <Text style={styles.busInfoBusNumText}>338</Text>
                </View>
            </View>

            {/* 버스 현황 */}
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