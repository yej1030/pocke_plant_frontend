import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Image,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import styles from './style/Main.style';

export default function Main({ navigation }) {
	return (
		<>
			<Header title="Pocket Plants" navigation={navigation} type="main" />
			<View style={styles.container}>

				{/* 식물 카드 */}
				<View style={styles.plantCard}>
					<Image
						source={require('../assets/persona.png')}
						style={styles.plantImage}
					/>
					<View style={styles.plantTextWrap}>
						<Text style={styles.plantName}>키니 (스킨답서스)</Text>
						<Text style={styles.plantMeta}>2026.04.18 / 3세</Text>
					</View>
					<TouchableOpacity
						style={styles.settingsButton}
						onPress={() => {}}
						activeOpacity={0.8}
					>
						<Image
							source={require('../assets/setting.png')}
							style={styles.settingsIcon}
						/>
					</TouchableOpacity>
				</View>

			</View>
			<BottomButton title="식물 등록하기" onPress={() => navigation.navigate('PlantRegister')} />
		</>
	);
}