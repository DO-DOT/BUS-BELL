import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FindBus from '../pages/FindBus'
import Bus from '../pages/Bus'
import BottomTabNav from './BottomTabNav'

const Stack = createNativeStackNavigator()

const StackNav = () => {
    return (
        <Stack.Navigator initialRouteName='FindBus' >
            <Stack.Screen
                name='FindBus'
                component={FindBus}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='BottomTabNav'
                component={BottomTabNav}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNav