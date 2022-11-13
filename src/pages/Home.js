import React from 'react'
import {
  	SafeAreaView,
	ScrollView,
	View,
	TextInput,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	StyleSheet,
} from 'react-native'

const Home = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			{/* 검색바 */}
			<View style={styles.searchContainer}>
				<Image
					style={styles.searchIcon}
					source={require('../assets/img/search_icon.png')}
				/>
				<TextInput 
					placeholder='버스 검색'
				/>
			</View>

			{/* 주변 정류장 */}
			<TouchableOpacity
				style={styles.nearbyStopContainer}
				onPress={() => null}
			>
				<View>
					<Text style={styles.nearbyStopText}>주변 정류장</Text>
					<Text style={styles.nearbyStopNameText}>산학협력관</Text>
				</View>
				<Image
					style={styles.pinIcon}
					source={require('../assets/img/pin.png')}
				/>
			</TouchableOpacity>

			{/* 즐겨찾기 */}
			<View style={styles.favoritesContainer}>
				<Image
					style={styles.starIcon}
					source={require('../assets/img/star.png')}
				/>
				<Text style={styles.favoritesText}>즐겨찾기</Text>
			</View>

			<ScrollView>
				{/* 즐겨찾는 버스 */}
				<View>
					<TouchableOpacity
						style={styles.favoritesBusContainer}
						onPress={() => navigation.navigate('Bus')}
					>
						<Text style={styles.favoritesBusNumText}>338</Text>
						<Image
							style={styles.busIcon}
							source={require('../assets/img/bus.png')}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.favoritesBusContainer}
						onPress={() => null}
					>
						<Text style={styles.favoritesBusNumText}>123</Text>
						<Image
							style={styles.busIcon}
							source={require('../assets/img/bus.png')}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.favoritesBusContainer}
						onPress={() => null}
					>
						<Text style={styles.favoritesBusNumText}>사하10</Text>
						<Image
							style={styles.busIcon}
							source={require('../assets/img/bus.png')}
						/>
					</TouchableOpacity>
				</View>

				{/* 즐겨찾기 추가 */}
				<TouchableOpacity
					style={styles.addFavoritesContainer}
					onPress={() => null}
				>
					<Image
						style={styles.plusIcon}
						source={require('../assets/img/plus.png')}
					/>
					<Text>즐겨찾는 버스 추가하기</Text>
				</TouchableOpacity>
			</ScrollView>

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: '#FFF',
		padding: 20,
	},
	searchContainer: {
		flexDirection: 'row',
		backgroundColor: '#EEE',
		borderRadius: 10,
		alignItems: 'center',
	},
	searchIcon: {
		height: 20,
		width: 20,
		marginHorizontal: 10,
	},
	nearbyStopContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1.5,
		borderColor: '#FFD400',
		borderRadius: 10,
		padding: 15,
		marginVertical: 20,
	},
	nearbyStopText: {
		fontSize: 14,
	},
	nearbyStopNameText: {
		fontSize: 17,
		marginTop: 5,
	},
	pinIcon: {
		height: 40,
		width: 30,
	},
	favoritesContainer: {
		flexDirection: 'row',
		marginTop: 25,
	},
	starIcon: {
		height: 20,
		width: 20,
		marginRight: 5,
	},
	favoritesText: {
		fontSize: 15,
	},
	favoritesBusContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1.5,
		borderColor: '#FFD400',
		borderRadius: 10,
		padding: 15,
		marginTop: 15,
	},
	favoritesBusNumText: {
		fontSize: 25,
	},
	busIcon: {
		height: 35,
		width: 35,
	},
	addFavoritesContainer: {
		flexDirection: 'row',
		borderWidth: 1.5,
		borderColor: '#FFD400',
		borderRadius: 10,
		padding: 10,
		marginVertical: 15,
	},
	plusIcon: {
		height: 20,
		width: 20,
		marginRight: 5,
	},
})

export default Home