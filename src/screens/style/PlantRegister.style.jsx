import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#F8FAFC',
	},

	container: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20,
		paddingTop: 14,
	},

	labelMain: {
		fontSize: 16,
		color: '#1F2937',
		fontWeight: '600',
	},

	// ============================================================
	// 통일: 라벨-위 배치 (일지 방식) + 폰트 15/500, 힌트 12/400
	// ============================================================
	formLabel: {
		fontSize: 15,
		fontWeight: '500',
		color: '#9CA3AF',
		marginTop: 14,
		marginBottom: 6,
	},
	formLabelOpt: {
		fontSize: 12,
		fontWeight: '400',
		color: '#9CA3AF',
	},

	// 통일: 밑줄 → 테두리 박스 입력창
	input: {
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 10,
		fontSize: 15,
		color: '#1F2937',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 12,
		paddingVertical: 10,
	},

	dualRow: {
		flexDirection: 'row',
		gap: 12,
	},
	dualCol: {
		flex: 1,
	},
	dualColSmall: {
		width: 110,
	},

	dateButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	dateText: {
		fontSize: 15,
		color: '#1F2937',
	},
	dateArrowIcon: {
		width: 18,
		height: 18,
	},

	ageInputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 10,
		paddingHorizontal: 12,
	},
	ageInput: {
		flex: 1,
		fontSize: 15,
		color: '#1F2937',
		textAlign: 'center',
	},
	ageText: {
		fontSize: 15,
		color: '#1F2937',
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
		backgroundColor: '#E5E7EB',
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
		borderColor: '#E5E7EB',
		borderStyle: 'dashed',
		backgroundColor: '#E5E7EB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	photoAddBoxText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#9CA3AF',
		marginTop: 4,
	},

	// ============================================================
	// 통일: 선택형 칩 (일지 mood칩 방식, border 1.5 + radius 20)
	// ============================================================
	chipWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	chip: {
    borderWidth: 1,
    borderColor: '#7FC77C',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
	},
	chipActive: {
		backgroundColor: '#7FC77C',
		borderColor: '#7FC77C',
	},
	chipText: {
		color: '#7FC77C',
		fontWeight: '500',
		fontSize: 14,
	},
	chipTextActive: {
		color: '#FFFFFF',
		fontWeight: '600',
	},

	inputUnderChips: {
		marginTop: 12,
	},

	aiGuide: {
		marginTop: 10,
		fontSize: 13,
		color: '#7FC77C',
	},

	analyzeButton: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#7FC77C',
		borderRadius: 10,
		paddingVertical: 12,
		alignItems: 'center',
	},
	analyzeButtonText: {
		color: '#7FC77C',
		fontSize: 14,
		fontWeight: '600',
	},

	aiResultCard: {
		marginTop: 14,
		backgroundColor: '#F7FCF8',
		borderRadius: 14,
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderWidth: 1,
		borderColor: '#DDF3E4',
	},
	aiResultTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	aiResultTitle: {
		fontSize: 15,
		fontWeight: '600',
		color: '#2E7D57',
	},
	aiRetry: {
		fontSize: 13,
		color: '#6B7280',
		fontWeight: '600',
	},
	aiResultDesc: {
		marginTop: 6,
		fontSize: 13,
		color: '#7BA892',
	},

	suggestionList: {
		marginTop: 6,
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 8,
		overflow: 'hidden',
		maxHeight: 200,
	},
	suggestionItem: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	suggestionText: {
		fontSize: 15,
		color: '#1F2937',
	},

	characterSelector: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	arrowButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: '#F3F7F3',
		alignItems: 'center',
		justifyContent: 'center',
	},
	arrowText: {
		fontSize: 18,
		color: '#6B7280',
		fontWeight: '500',
	},
	characterImage: {
		width: 140,
		height: 140,
		resizeMode: 'contain',
	},
	characterCount: {
		textAlign: 'center',
		marginTop: 8,
		fontSize: 15,
		fontWeight: '600',
		color: '#1F2937',
	},
	dotContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#E5E7EB',
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: '#7FC77C',
	},

	qrButton: {
		borderWidth: 1,
		borderColor: '#7FC77C',
		borderRadius: 10,
		paddingVertical: 10,
		alignItems: 'center',
		backgroundColor: '#F7FCF8',
	},
	qrButtonText: {
		color: '#7FC77C',
		fontSize: 14,
		fontWeight: '600',
	},

	macAddressWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F1F3F5',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 10,
	},
	macAddressText: {
		fontSize: 14,
		color: '#6B7280',
		flex: 1,
	},
	connectedBadge: {
		backgroundColor: '#DDF3E4',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
	connectedText: {
		color: '#2E7D57',
		fontSize: 12,
		fontWeight: 'bold',
	},
});