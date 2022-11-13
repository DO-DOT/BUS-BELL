import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home'
import Bus from '../pages/Bus'

const Stack = createNativeStackNavigator()

const StackNav = () => {
    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    )
}

export default StackNav