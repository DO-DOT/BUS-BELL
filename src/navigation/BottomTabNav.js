import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../pages/Home'

import {
    View,
    Text,
} from 'react-native'

const Tab = createBottomTabNavigator()

const None = () => {
    return (
        <View>
            <Text>None</Text>
        </View>
    )
}

const BottomTabNav = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='None'
                component={None}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNav