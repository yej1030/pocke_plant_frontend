import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import Bottom from '../components/Bottom';

export default function Friendship({ navigation, route }) {
	const plantName = route?.params?.plant?.name ?? '식물';

	return (
		<>
			<Header title={`${plantName} 친밀도`} navigation={navigation} type="full" />

			<View style={{ flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' }}>
				<Text style={{ fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 8 }}>
					친밀도 화면
				</Text>
				<Text style={{ fontSize: 14, color: '#777', lineHeight: 20 }}>
					현재는 화면 연결만 되어 있습니다. 나중에 친밀도 수치, 보상, 상호작용 기록을 붙이면 됩니다.
				</Text>
			</View>

			<Bottom
				type="detail"
				active="friend"
				navigation={navigation}
				params={{ plant: route?.params?.plant, plantId: route?.params?.plantId }}
			/>
		</>
	);
}
