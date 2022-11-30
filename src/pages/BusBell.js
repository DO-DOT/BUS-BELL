import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from 'react-native'
import Loading from '../components/Loading'

let busStop = []

// https://gochibul.tistory.com/5
// Network request failed의 원인은 아주 다양한데
// 서버에 아예 요청 자체가 안 가면 연결된 디바이스의 tcp를 서버 포트 번호로 해보자
// 그냥 USB 케이블 새로 연결할 때마다 해줘야 하는 듯
// ex. adb -s 기기번호(adb devices로 나오는 거) reverse tcp:52273 tcp:52273

const BusBell = ({ route }) => {
    const busNum = route.params.bus_num
    const busCode = route.params.bus_code
    const cityCode = JSON.parse(JSON.stringify(busCode.slice(0,3)))
    const [currentStopId, setCurrentStopId] = useState(0)
    const [clicked, setClicked] = useState(false)

    const [isLoadingList, setIsLoadingList] = useState(true)
    const [isLoadingCurrentStopId, setIsLoadingCurrentStopId] = useState(true)
    const [isUpdatingCurrentStopId, setIsUpdatingCurrentStopId] = useState(false)

    const click = () => {
        fetch('http://localhost:52273/updateToBellPushed', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                busNum: busNum,
                busCode: busCode,
            }),
        })
        .then((res) => {})
        .then((data) => {})
        .catch((error) => console.log(error))
        setClicked(true)
    }

    const openBackDoor = () => {
        fetch('http://localhost:52273/updateToBellUnpushed', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                busNum: busNum,
                busCode: busCode,
            }),
        })
        .then((res) => {})
        .then((data) => {})
        .catch((error) => console.log(error))
        setClicked(false)
        
        if (currentStopId + 1 <= busStop.length) {
            fetch('http://localhost:52273/updateCurrentId', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    busNum: busNum,
                    busCode: busCode,
                    currentid: currentStopId,
                }),
            })
            .then((res) => {})
            .then((data) => setCurrentStopId(currentStopId + 1))
            .catch((error) => console.log(error))
            setIsUpdatingCurrentStopId(true)
        }
    }

    useEffect(() => {
        fetch('http://localhost:52273/bellState', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                busNum: busNum,
                busCode: busCode,
            }),
        })
        .then((res) => {return res.json()})
        .then((data) => {
            console.log(data)
            if (data[0].pushbell == 1) { // 이미 벨이 눌러진 상태
                setClicked(true)
            }
            else {
                setClicked(false)
            }
        })
        .catch((error) => console.log(error))

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
    })

    if(isLoadingCurrentStopId || isLoadingList) {
        return (
            <Loading />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.busstopContainer}>
                <Text style={styles.busText}>
                    이번 정류장
                </Text>
                <Text style={styles.busstopText}>{
                    busStop[busStop.findIndex((obj) => obj.id == currentStopId)].busStopName
                }</Text>
                <Text style={styles.busText}>
                    다음 정류장
                </Text>
                {
                currentStopId + 1 <= busStop.length
                ? <Text style={styles.busstopText}>{
                    busStop[busStop.findIndex((obj) => obj.id == currentStopId + 1)].busStopName
                }</Text>
                : <Text style={styles.busstopText}>-</Text>
                }
            </View>
            <View style={styles.bellContainer}>
                <TouchableOpacity
                    style={
                        clicked
                        ? styles.clickedBellContainer
                        : styles.unClickedbellContainer
                    }
                    onPress={() => {
                        clicked
                        ? Alert.alert('하차벨이 이미 눌러진 상태입니다.')
                        : click()
                    }}
                >
                    <Text style={styles.bellText}>STOP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.backDoorContainer }
                    onPress={() => { openBackDoor() }}
                >
                    <Text style={styles.doorText}>뒷문 열기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    busstopContainer: {
        flex: 1,
        marginVertical: 30,
        marginHorizontal: 50,
    },
    busText: {
        fontSize: 25,
        fontWeight: '600',
        color: '#4E4F50',
    },
    busstopText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 30,
        color: '#4A4B4E',
    },
    bellContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unClickedbellContainer: {
        backgroundColor: '#932516',
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    clickedBellContainer: {
        backgroundColor: '#F12424',
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    bellText: {
        fontSize: 50,
        color: '#000000',
    },
    backDoorContainer: {
        backgroundColor: '#FFD400',
        width: 160,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,
        borderRadius: 20,
    },
    doorText: {
        fontSize: 25,
        color: '#000000',
    }
})

export default BusBell

/*
* 뒷문 열기(openBackDoor)를 한 번은 괜찮은데 여러 번 누르면 무한 로딩 상태에 빠진다.
* 비동기 이쪽 문젠 거 같은데 뭘 어떻게 고쳐야할지 모르겠다.
*/