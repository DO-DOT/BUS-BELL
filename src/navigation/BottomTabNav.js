import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import StackNav from './StackNav'
import Home from '../pages/Home'
import Bus from '../pages/Bus'

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
            />
            <Tab.Screen
                name='Home'
                component={Home}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNav