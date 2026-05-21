import React, { useContext, useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Image,
	TouchableOpacity,
	StatusBar,
	Modal,
	Pressable,
	Alert,
} from 'react-native';
import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import styles from './style/Main.style';
import { PlantsContext } from '../context/PlantsContext';

export default function Main({ navigation }) {
    const { plants, removePlant, toggleBookmark } = useContext(PlantsContext);
	const [actionVisible, setActionVisible] = useState(false);
	const [selectedPlant, setSelectedPlant] = useState(null);
	const [selectedPlantId, setSelectedPlantId] = useState(null);

	const openActionSheet = (p) => {
		setSelectedPlant(p);
		setSelectedPlantId(p.id);
		setActionVisible(true);
	};

	const closeActionSheet = () => {
		setActionVisible(false);
		setSelectedPlant(null);
		setSelectedPlantId(null);
	};

	const onEdit = () => {
		closeActionSheet();
		if (selectedPlant || selectedPlantId) {
			navigation.navigate('PlantRegister', { plant: selectedPlant, plantId: selectedPlantId });
		}
	};

	const onDelete = () => {
		const id = selectedPlantId;
		closeActionSheet();
		// show Alert after a short delay so the action sheet has time to close
		setTimeout(() => {
			Alert.alert('삭제', '삭제하시겠습니까?', [
				{ text: '취소', style: 'cancel' },
				{ text: '삭제', style: 'destructive', onPress: () => { if (id) removePlant(id); } },
			]);
		}, 220);
	};

	const sortedPlants = [...plants]
		.map((plant, index) => ({ plant, index }))
		.sort((left, right) => {
			const leftBookmarked = left.plant.bookmarked ? 1 : 0;
			const rightBookmarked = right.plant.bookmarked ? 1 : 0;
			if (leftBookmarked !== rightBookmarked) return rightBookmarked - leftBookmarked;
			return left.index - right.index;
		});

	return (
		<>
			<Header title="Pocket Plants" navigation={navigation} type="main" />
			<View style={styles.container}>
				{plants.length === 0 ? (
					<Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>등록된 식물이 없습니다.</Text>
				) : (
					sortedPlants.map(({ plant: p }) => (
						<TouchableOpacity
							key={p.id}
							style={styles.plantCard}
							activeOpacity={0.85}
							onLongPress={() => {
								openActionSheet(p);
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
							<TouchableOpacity
								style={styles.settingsButton}
								onPress={() => toggleBookmark(p.id)}
								activeOpacity={0.8}
							>
								<Image
									source={p.bookmarked ? require('../assets/bookmarked.png') : require('../assets/unbookmarked.png')}
									style={styles.settingsIcon}
								/>
							</TouchableOpacity>
						</TouchableOpacity>
					))
				)}
			</View>
			<Modal visible={actionVisible} animationType="slide" transparent onRequestClose={closeActionSheet}>
				<Pressable style={styles.actionOverlay} onPress={closeActionSheet} />
				<View style={styles.actionContainer}>
					<View style={styles.actionHandleWrap}>
						<View style={styles.actionHandle} />
					</View>
					<Pressable style={styles.actionItem} onPress={onEdit}>
						<Text style={styles.actionIcon}>✏️</Text>
						<Text style={styles.actionText}>수정</Text>
					</Pressable>
					<View style={styles.actionDivider} />
					<Pressable style={styles.actionItem} onPress={onDelete}>
						<Text style={[styles.actionIcon, { color: '#B85C5C' }]}>🗑️</Text>
						<Text style={[styles.actionText, { color: '#B85C5C' }]}>삭제</Text>
					</Pressable>
					<View style={styles.actionSpacing} />
					<Pressable style={styles.actionCancel} onPress={closeActionSheet}>
						<Text style={styles.actionCancelText}>취소</Text>
					</Pressable>
				</View>
			</Modal>
			<BottomButton title="식물 등록하기" onPress={() => navigation.navigate('PlantRegister')} />
		</>
	);
}