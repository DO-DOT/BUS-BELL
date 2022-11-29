/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

import React, {
    useState,
    useEffect,
    useRef,
} from 'react';
  
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
    Alert,
    TouchableOpacity,
} from 'react-native';
  
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
  
import BleManager, { connect } from '../ble/BleManager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const FindBus = ({ navigation }) => {
    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();
    const [list, setList] = useState([]);
    const myBus = useRef(new Object());
    const isAuto = useRef(0);

    // 내 버스 자동 찾기 버튼을 눌렀을 때
    const startScanAuto = () => {
        if (!isScanning) {
        isAuto.current = 1;
        myBus.current = {};
        BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning Auto...');
            setIsScanning(true);
        }).catch(err => {
            console.error(err);
        });
        }
    }

    // 내 버스 수동 찾기 버튼을 눌렀을 때
    const startScanManual = () => {
        if (!isScanning) {
        isAuto.current = -1;
        BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning Manual...');
            setIsScanning(true);
        }).catch(err => {
            console.error(err);
        });
        }
    }

    // scan 종료
    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);

        if (isAuto.current == 1) {
            isAuto.current = 0;
            if(Object.keys(myBus.current).length == 0) {
                Alert.alert(
                    '찾기 실패',
                    '탑승 버스 정보를 알 수 없습니다.'
                );
                console.log('탑승 버스 정보를 알 수 없습니다.');
            }
            else {
                console.log(myBus.current);
                navigation.navigate('BottomTabNav', {
                    bus_num: printNum(myBus.current.advertising.serviceUUIDs[0]),
                    bus_code: myBus.current.advertising.serviceUUIDs[1],
                });

                // https://devbksheen.tistory.com/entry/React-Navigtion-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0
                // navigation을 사용해 화면을 이동할때 navigate 또는 push 함수를 사용할 수 있는데 둘의 차이
            }
        }
        isAuto.current = 0;
    }

    const handleDisconnectedPeripheral = (data) => {
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        if (isAuto.current == 1) {
            if (peripheral.name == 'BUS' && Object.keys(myBus.current).length == 0) {
            console.log('set mybus');
            myBus.current = peripheral;
            handleStopScan();
            }
        }
        else if (isAuto.current == -1) {
            if (peripheral.name == 'BUS') {
            console.log('print list');
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
            }
        }
    }

    const connectBus = (peripheral) => {
        myBus.current = peripheral;
        navigation.navigate('BottomTabNav', {
            bus_num: printNum(myBus.current.advertising.serviceUUIDs[0]),
            bus_code: myBus.current.advertising.serviceUUIDs[1],
        });
    }

    // const testPeripheral = (peripheral) => {
    //   if (peripheral){
    //     if (peripheral.connected){
    //       BleManager.disconnect(peripheral.id);
    //     }else{
    //       BleManager.connect(peripheral.id).then(() => {
    //         let p = peripherals.get(peripheral.id);
    //         if (p) {
    //           p.connected = true;
    //           peripherals.set(peripheral.id, p);
    //           setList(Array.from(peripherals.values()));
    //         }
    //         console.log('Connected to ' + peripheral.id);


    //         setTimeout(() => {

    //           /* Test read current RSSI value */
    //           BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
    //             console.log('Retrieved peripheral services', peripheralData);

    //             BleManager.readRSSI(peripheral.id).then((rssi) => {
    //               console.log('Retrieved actual RSSI value', rssi);
    //               let p = peripherals.get(peripheral.id);
    //               if (p) {
    //                 p.rssi = rssi;
    //                 peripherals.set(peripheral.id, p);
    //                 setList(Array.from(peripherals.values()));
    //               }
    //             });                                          
    //           });
    //         }, 900);
    //       }).catch((error) => {
    //         console.log('Connection error', error);
    //       });
    //     }
    //   }

    // }

    useEffect(() => {
        BleManager.start({showAlert: false});

        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
        bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
        bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                        console.log("User accept");
                        } else {
                        console.log("User refuse");
                        }
                    });
                }
            });
        }  
        
        return (() => {
            console.log('unmount');      
            bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
            bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
            bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
        })
    }, []);

    // 버스 번호 반환
    const printNum = (num) => {
        let ret = num;
        ret = ret.replace(/(^0+)/, ''); // 왼쪽 0 없애기
        ret = ret.replace('a', '-1');
        ret = ret.replace('b', '-2');
        ret = ret.replace('c', '-3');
        return ret;
    }

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
            <TouchableHighlight onPress={() => connectBus(item) }>
                <View style={[styles.row, {backgroundColor: color}]}>
                    <Text style={ styles.numberText }>
                        { printNum(item.advertising.serviceUUIDs[0]) }
                    </Text>
                    {/* <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text> */}
                    {/* <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text> */}
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#99CCFF"/>
            <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                    <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
                )}
                <View style={styles.body}>
                
                <View style={ styles.autoFindContainer }>
                    <TouchableOpacity
                        onPress={() => startScanAuto()}
                    >
                        <Text style={ styles.menuText }>버스 자동 찾기</Text>
                    </TouchableOpacity>         
                </View>

                <View style={ styles.manualFindContainer }>
                    <TouchableOpacity
                        onPress={() => startScanManual()}
                    >
                        <Text style={ styles.menuText }>버스 수동 찾기</Text>
                    </TouchableOpacity>            
                </View>

                {/* <View style={{margin: 10}}>
                    <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
                </View> */}

                {(list.length == 0) &&
                    <View style={{flex:1, margin: 20}}>
                    <Text style={{textAlign: 'center'}}>버스 정보 없음</Text>
                    </View>
                }
                
                </View>              
            </ScrollView>
            <FlatList
                data={list}
                renderItem={({ item }) => renderItem(item) }
                keyExtractor={item => item.id}
                />              
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    numberText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000000',
        padding: 20,
    },
    autoFindContainer: {
        backgroundColor: '#FF7F00',
        width: 200,
        height: 80,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 80,
    },
    manualFindContainer: {
        backgroundColor: '#6DF6EA',
        width: 200,
        height: 80,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 80,
    },
    menuText: {
        fontSize: 25,
    },
});

export default FindBus