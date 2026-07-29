import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import Bottom from '../components/Bottom';

export default function PlantDiary({ navigation, route }) {
	const plantName = route?.params?.plant?.name ?? '식물';

	return (
		<>
			<Header title={`${plantName} 일지`} navigation={navigation} type="full" />

			<View style={{ flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' }}>
				<Text style={{ fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 8 }}>
					식물 일지 화면
				</Text>
				<Text style={{ fontSize: 14, color: '#777', lineHeight: 20 }}>
					현재는 화면 연결만 되어 있습니다. 나중에 일지 작성, 기록 목록, 사진 첨부 기능을 붙이면 됩니다.
				</Text>
			</View>

			<Bottom
				type="detail"
				active="diary"
				navigation={navigation}
				params={{ plant: route?.params?.plant, plantId: route?.params?.plantId }}
			/>
		</>
	);
}
