import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },

	// 식물 카드
	plantCard: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 18,
		backgroundColor: '#fff',
	},

	plantImage: {
		width: 64,
		height: 64,
		resizeMode: 'contain',
		marginRight: 14,
		borderRadius: 32,
		backgroundColor: '#F2FBF6',
		borderWidth: 1,
		borderColor: '#dff0e6',
	},
	plantTextWrap: {
		flex: 1,
		justifyContent: 'center',
	},
	plantName: {
		fontSize: 16,
		fontWeight: '700',
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
	},

	swipeActionContainer: {
		flexDirection: 'row',
		marginVertical: 6,
		marginRight: 12,
	},

	editAction: {
		width: 60,
		backgroundColor: 'rgb(149, 222, 188, 0.6)',
		borderRadius: 8,
		marginRight: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},

	deleteAction: {
		width: 60,
		backgroundColor: 'rgb(255, 179, 179, 0.6)',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},

	swipeActionText: {
		color: '#000000',
		fontSize: 13,
		fontWeight: '700',
	},

	// 새 식물 등록 카드 - 다른 카드와 통일감
	addPlantCard: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#EFEFEF',
		borderStyle: 'broken',
		backgroundColor: '#ffffff',
		marginHorizontal: 10,
		marginTop: 8,
	},

	addPlantIconWrap: {
		width: 34,
		height: 34,
		borderRadius: 10,
		backgroundColor: '#F2FBF6',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},

	addPlantIcon: {
		fontSize: 16,
		fontWeight: '700',
		color: '#b1deb5',
	},

	addPlantText: {
		fontSize: 15,
		fontWeight: '600',
		color: '#878787',
	},

});