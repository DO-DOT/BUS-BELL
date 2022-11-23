import { NavigationContainer } from '@react-navigation/native'
import BottomTabNav from './src/navigation/BottomTabNav'
import StackNav from './src/navigation/StackNav'

const App = () => {
	return (
		<NavigationContainer>
			<StackNav />
		</NavigationContainer>
	)
}

export default App