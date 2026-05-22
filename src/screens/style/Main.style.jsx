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
	},

	// Action sheet (custom modal)
	actionOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.18)'
	},
	actionContainer: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 18,
		borderTopRightRadius: 18,
		paddingBottom: 24,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 8,
	},
	actionHandleWrap: {
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
	actionHandle: {
		width: 48,
		height: 5,
		borderRadius: 3,
		backgroundColor: '#e0e0e0',
	},
	actionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 24,
	},
	actionIcon: {
		fontSize: 20,
		marginRight: 12,
	},
	actionText: {
		fontSize: 17,
		color: '#222',
	},
	actionDivider: {
		height: 1,
		backgroundColor: '#eee',
	},
	actionSpacing: {
		height: 8,
	},
	actionCancel: {
		alignItems: 'center',
		paddingVertical: 16,
		backgroundColor: '#fff',
	},
	actionCancelText: {
		fontSize: 16,
		color: '#bbb',
	},
});