import { Image, StyleSheet } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BusBell from '../pages/BusBell'
import Bus from '../pages/Bus'

import bell from '../assets/img/bell.png'
import focusedBell from '../assets/img/focusedBell.png'
import map from '../assets/img/map.png'
import focusedMap from '../assets/img/focusedMap.png'

const Tab = createBottomTabNavigator()

const BottomTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                let iconName
    
                if (route.name === '하차벨') {
                    iconName = focused ? focusedBell : bell
                } else if (route.name === '노선도') {
                    iconName = focused ? focusedMap : map
                }
    
                return (
                    <Image
                        style={styles.icon}
                        source={iconName}
                    />
                )
                },
                tabBarActiveTintColor: '#005DFF',
                tabBarInactiveTintColor: '#C0C7D4',
            })}
        >
            <Tab.Screen
                name='하차벨'
                component={BusBell}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='노선도'
                component={Bus}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    }
})

export default BottomTabNav