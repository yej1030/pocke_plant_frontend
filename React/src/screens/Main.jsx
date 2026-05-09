import React, { useContext } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Image,
	TouchableOpacity,
	StatusBar,
	Alert,
} from 'react-native';
import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import styles from './style/Main.style';
import { PlantsContext } from '../context/PlantsContext';

export default function Main({ navigation }) {
	const { plants, removePlant } = useContext(PlantsContext);

	return (
		<>
			<Header title="Pocket Plants" navigation={navigation} type="main" />
			<View style={styles.container}>
				{plants.length === 0 ? (
					<Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>등록된 식물이 없습니다.</Text>
				) : (
					plants.map((p, idx) => (
						<TouchableOpacity
							key={idx}
							style={styles.plantCard}
							activeOpacity={0.85}
							onLongPress={() => {
								Alert.alert('선택', '작업을 선택하세요', [
									{ text: '수정', onPress: () => navigation.navigate('PlantRegister', { plant: p, index: idx }) },
									{ text: '삭제', style: 'destructive', onPress: () => removePlant(idx) },
									{ text: '취소', style: 'cancel' },
								]);
							}}
						>
							{p.imageUri ? (
								<Image source={{ uri: p.imageUri }} style={styles.plantImage} />
							) : (
								<Image source={require('../assets/persona.png')} style={styles.plantImage} />
							)}
							<View style={styles.plantTextWrap}>
								<Text style={styles.plantName}>{p.name} {p.species ? `(${p.species})` : ''}</Text>
								<Text style={styles.plantMeta}>{p.adoptDate ? p.adoptDate : ''} {p.age ? `/ ${p.age}세` : ''}</Text>
							</View>
							<TouchableOpacity style={styles.settingsButton} onPress={() => {}} activeOpacity={0.8}>
								<Image source={require('../assets/setting.png')} style={styles.settingsIcon} />
							</TouchableOpacity>
						</TouchableOpacity>
					))
				)}
			</View>
			<BottomButton title="식물 등록하기" onPress={() => navigation.navigate('PlantRegister')} />
		</>
	);
}