import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import Spinner from '../assets/img/spinner.gif'

const Loading = () => {
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <Text style={styles.loadingText}>잠시만 기다려 주세요.</Text>
            <Image 
                source={Spinner} 
                style={styles.spinnerIcon}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // 가운데 중간 정렬 어떻게 하는 거야
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 18,
    },
    spinnerIcon: {
        width: 150,
        height: 150,
    },
})

export default Loading