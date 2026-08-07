import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#fafafa',
	},

	container: {
        flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		paddingTop: 14,
	},

	labelMain: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},

	// 통일: 라벨-위 배치, 폰트값은 기존 그대로 유지 (이미 맞춰져 있음)
	formLabel: {
		fontSize: 15,
		fontWeight: '500',
		color: '#b0b0b0',
		marginTop: 14,
		marginBottom: 6,
	},
	formLabelOpt: {
		fontSize: 12,
		fontWeight: '400',
		color: '#C4C4C4',
	},

	// 통일: 밑줄 → 테두리 박스 입력창
	input: {
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderRadius: 10,
		fontSize: 15,
		fontWeight: '400',
		color: '#222',
		backgroundColor: '#fff',
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	textarea: {
		minHeight: 120,
	},

	// ============================================================
	// 통일: 사진 등록 (일지 썸네일+추가박스 패턴)
	// ============================================================
	photoRow: {
		flexDirection: 'row',
		gap: 8,
	},
	photoThumbWrap: {
		position: 'relative',
	},
	photoThumb: {
		width: 220,
		height: 220,
		borderRadius: 12,
		backgroundColor: '#EFEFEF',
		resizeMode: 'cover',
	},
	photoRemoveBtn: {
		position: 'absolute',
		top: -6,
		right: -6,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#00000099',
		alignItems: 'center',
		justifyContent: 'center',
	},
	photoAddBox: {
		width: '100%',
		height: 120,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderStyle: 'dashed',
		backgroundColor: '#FAFAFA',
		alignItems: 'center',
		justifyContent: 'center',
	},
	photoAddBoxText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#C4C4C4',
		marginTop: 4,
	},
});