import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
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


	swipeActionContainer: {
	flexDirection: 'row',
	marginVertical: 6,
	marginRight: 12,
},

editAction: {
  width: 60,
  backgroundColor: 'rgb(149, 222, 188, 0.6)',   // 진한 초록 배경
  borderRadius: 8,
  marginRight: 4,
  justifyContent: 'center',
  alignItems: 'center',
},

deleteAction: {
  width: 60,
  backgroundColor: 'rgb(255, 179, 179, 0.6)',   // 진한 빨강 배경
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},

swipeActionText: {
  color: '#000000',   // 흰 텍스트
  fontSize: 13,
  fontWeight: '700',
},
});
