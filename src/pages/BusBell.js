import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'

const BusBell = () => {
    const [clicked, setClicked] = useState(false)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.busstopContainer}>
                <Text style={styles.busText}>
                    이번 정거장
                </Text>
                <Text style={styles.busstopText}>
                    동아대입구
                </Text>
                <Text style={styles.busText}>
                    다음 정거장
                </Text>
                <Text style={styles.busstopText}>
                    에덴공원
                </Text>
            </View>
            <View style={styles.bellContainer}>
                <TouchableOpacity
                    style={
                        clicked
                        ? styles.clickedBellContainer
                        : styles.unClickedbellContainer
                    }
                    onPress={() => setClicked(!clicked)}
                >
                    <Text style={styles.bellText}>STOP</Text>
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
        flex: 4,
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
    }
})

export default BusBell