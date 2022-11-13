import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

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
            <ScrollView>
            </ScrollView>

            {/* 버스 하차벨 */}
            <View style={styles.busStopContainer}>
                <TouchableOpacity
                    style={styles.busStopBell}
                    onPress={() => null}
                >
                    <Text style={styles.busStopBellText}>동아대 입구에서 하차하기</Text>
                </TouchableOpacity>
            </View>
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
        borderColor: '#FFD400',
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

    busStopContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1.5,
        borderColor: '#FFD400',
    },
    busStopBell: {
        backgroundColor: '#FF5555',
        borderRadius: 10,
        margin: 20,
    },
    busStopBellText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
        marginVertical: 15,
        marginHorizontal: 30,
    }
})

export default Bus