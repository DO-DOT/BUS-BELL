import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FindBus from '../pages/FindBus'
import Home from '../pages/Home'
import Bus from '../pages/Bus'
import BottomTabNav from './BottomTabNav'

const Stack = createNativeStackNavigator()

const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='FindBus'
                component={FindBus}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Bus'
                component={Bus}
                options={{
                    title: 'BUS',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#FFD400',
                    },
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name='BottomTabNav'
                component={BottomTabNav}
            />
        </Stack.Navigator>
    )
}

export default StackNav