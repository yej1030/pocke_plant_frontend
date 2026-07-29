import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
	IconHome,
	IconClipboardText,
	IconLeaf,
	IconNotebook,
	IconHeart,
} from '@tabler/icons-react-native';

const MAIN_TABS = [
	{ key: 'home', title: '홈', screen: 'Main', Icon: IconHome },
	{ key: 'board', title: '게시판', screen: 'Board', Icon: IconClipboardText },
];

const DETAIL_TABS = [
	{ key: 'plant', title: '식물', screen: 'PlantDetail', Icon: IconLeaf },
	{ key: 'diary', title: '식물 일지', screen: 'PlantDiary', Icon: IconNotebook },
	{ key: 'friend', title: '친밀도', screen: 'Friendship', Icon: IconHeart },
];

export default function Bottom({ type = 'main', active = 'home', navigation, params = {} }) {
	const tabs = type === 'main' ? MAIN_TABS : DETAIL_TABS;

	return (
		<View style={styles.container}>
			{tabs.map((tab) => {
				const isActive = active === tab.key;

				return (
					<TouchableOpacity
						key={tab.key}
						activeOpacity={0.8}
						style={styles.tab}
						onPress={() => {
							if (navigation) {
								navigation.navigate(tab.screen, params);
							}
						}}
					>
						<tab.Icon
							size={22}
							color={isActive ? '#7fc77c' : '#A0A0A0'}
							strokeWidth={1.75}
						/>

						<Text style={[styles.text, isActive && styles.activeText]}>
							{tab.title}
						</Text>

						{isActive && <View style={styles.indicator} />}
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderTopColor: '#ECECEC',
		height: 58,
	},

	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 3,
		position: 'relative',
	},

	text: {
		fontSize: 12,
		fontWeight: '600',
		color: '#A0A0A0',
	},

	activeText: {
		color: '#7fc77c',
		fontWeight: '600',
	},

	indicator: {
		position: 'absolute',
		bottom: -10,
		width: '100%',
		height: 3,
		backgroundColor: '#7fc77c',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
});