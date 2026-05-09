import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
	// 식물 카드
	plantCard: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingRight: 4,
	},
	plantImage: {
		width: 72,
		height: 72,
		resizeMode: 'contain',
		marginRight: 14,
		borderRadius: 36,
		backgroundColor: '#f5f5f5',
	},
	plantTextWrap: {
		flex: 1,
		justifyContent: 'center',
	},
	plantName: {
		fontSize: 16,
		fontWeight: '800',
		color: '#1f1f1f',
		marginBottom: 6,
	},
	plantMeta: {
		fontSize: 14,
		color: '#8f8f8f',
		fontWeight: '500',
	},
	settingsButton: {
		width: 34,
		height: 34,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	settingsIcon: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
		tintColor: '#8a8a8a',
	},
});