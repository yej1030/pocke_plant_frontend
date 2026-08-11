import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
		backgroundColor: '#FFFFFF',
	},

	plantImage: {
		width: 64,
		height: 64,
		resizeMode: 'contain',
		marginRight: 14,
		borderRadius: 32,
		backgroundColor: '#F2FBF6',
		borderWidth: 1,
		borderColor: '#DFF0E6',
	},
	plantTextWrap: {
		flex: 1,
		justifyContent: 'center',
	},
	plantName: {
		fontSize: 16,
		fontWeight: '700',
		color: '#1F2937',
		marginBottom: 6,
	},
	plantMeta: {
		fontSize: 14,
		color: '#6B7280',
		fontWeight: '400',
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
		color: '#1F2937',
		fontSize: 14,
		fontWeight: '600',
	},

	// 새 식물 등록 카드 - 다른 카드와 통일감
	addPlantCard: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderStyle: 'broken',
		backgroundColor: '#FFFFFF',
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
		color: '#B1DEB5',
	},

	addPlantText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#9CA3AF',
	},

});