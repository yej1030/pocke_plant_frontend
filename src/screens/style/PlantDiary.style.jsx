import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		paddingTop: 14,
	},

	// ============================================================
	// [PlantDiary.jsx] 일지 목록 (타임라인)
	// ============================================================
	countBadge: {
		fontSize: 12,
		fontWeight: '600',
		color: '#7fc77c',
		backgroundColor: '#E8F7EF',
		alignSelf: 'flex-start',
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 20,
		marginBottom: 12,
	},
	listFlex: { flex: 1 },
	listContent: { paddingBottom: 100 },

	entryRow: {
		flexDirection: 'row',
		gap: 10,
		paddingVertical: 8,
	},
	dotCol: {
		alignItems: 'center',
		paddingTop: 4,
	},
	dot: {
		width: 9,
		height: 9,
		borderRadius: 5,
		backgroundColor: '#7fc77c',
	},
	dotLine: {
		width: 1.5,
		flex: 1,
		minHeight: 40,
		backgroundColor: '#C8E6C9',
		marginTop: 3,
	},
	entryContent: { flex: 1 },
	entryDate: {
		fontSize: 11,
		fontWeight: '500',
		color: '#C4C4C4',
		marginBottom: 4,
	},
	entryImage: {
		width: '100%',
		height: 100,
		borderRadius: 12,
		backgroundColor: '#EFEFEF',
		marginBottom: 6,
	},
	entryImagePlaceholder: { width: '100%', height: 6 },
	entryNoteRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 6,
	},
	entryMoodEmoji: { fontSize: 14, marginTop: 1 },
	entryNote: {
		flex: 1,
		fontSize: 13,
		color: '#505050',
		lineHeight: 19,
	},

	emptyWrap: { alignItems: 'center', paddingVertical: 60 },
	emptyEmoji: { fontSize: 32, marginBottom: 10 },
	emptyText: {
		fontSize: 13,
		color: '#A7A7A7',
		textAlign: 'center',
		lineHeight: 20,
	},

	writeButton: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: '#7fc77c',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 4,
	},

	// ============================================================
	// [PlantDiaryDetail.jsx] 일지 상세
	// ============================================================
	detailContent: { paddingBottom: 40 },
	detailMetaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	detailDate: {
		fontSize: 16,
		fontWeight: '700',
		color: '#1f1f1f',
	},
	dayBadge: {
		backgroundColor: '#E8F7EF',
		paddingVertical: 3,
		paddingHorizontal: 8,
		borderRadius: 20,
	},
	dayBadgeText: {
		fontSize: 11,
		fontWeight: '700',
		color: '#7fc77c',
	},
	detailPhotoScroll: { marginBottom: 12 },
	detailPhoto: {
		width: 220,
		height: 220,
		borderRadius: 16,
		backgroundColor: '#EFEFEF',
		marginRight: 10,
	},
	moodRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#F0F0F0',
		borderRadius: 10,
		paddingVertical: 8,
		paddingHorizontal: 10,
		marginBottom: 12,
	},
	moodEmoji: { fontSize: 16 },
	moodLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: '#666666',
	},
	detailNote: {
		fontSize: 14,
		color: '#333333',
		lineHeight: 22,
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#F0F0F0',
		borderRadius: 12,
		padding: 12,
		marginBottom: 16,
	},

	sensorTitle: {
		fontSize: 11,
		fontWeight: '600',
		color: '#999999',
		marginBottom: 6,
	},
	sensorRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
	sensorChip: {
		flex: 1,
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#F0F0F0',
		borderRadius: 10,
		paddingVertical: 10,
		alignItems: 'center',
	},
	sensorValue: {
		fontSize: 14,
		fontWeight: '700',
		color: '#1f1f1f',
	},
	sensorLabel: {
		fontSize: 10,
		color: '#C4C4C4',
		marginTop: 2,
	},

	detailActionRow: { flexDirection: 'row', gap: 10 },
	detailActionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 14,
		borderRadius: 14,
		backgroundColor: '#7fc77c',
	},
	detailActionButtonHalf: { flex: 1 },
	detailActionText: {
		fontSize: 14,
		fontWeight: '700',
		color: '#FFFFFF',
	},

	// ============================================================
	// [PlantDiaryWrite.jsx] 작성 / 수정 공용 폼
	// 통일: formLabel 15/500 (Board writeLabel과 동일 스케일)
	// ============================================================
	formContent: { paddingBottom: 40 },

	formLabell: {
		fontSize: 15,
		fontWeight: '500',
		color: '#b0b0b0',
		marginBottom: 6,
	},
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

	photoRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
	photoThumbWrap: { position: 'relative' },
	photoThumb: {
		width: 150,
		height: 150,
		borderRadius: 12,
		backgroundColor: '#EFEFEF',
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

	// 통일: mood칩 (border 1.5 + radius 20) — 카테고리/성격 칩과 동일 규격
	moodPickRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
	moodChip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		paddingVertical: 5,
		paddingHorizontal: 12,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#7fc77c',
		backgroundColor: '#ffffff',
	},
	moodChipActive: {
		backgroundColor: '#7fc77c',
		borderColor: '#7fc77c',
	},
	moodChipEmoji: { fontSize: 14 },
	moodChipText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#7fc77c',
	},
	moodChipTextActive: { color: '#ffffff', fontWeight: '700' },

	// 통일: 텍스트 입력창 border 1 (기존 1.5 → 1)
	noteInput: {
		minHeight: 120,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderRadius: 10,
		padding: 12,
		fontSize: 14,
		color: '#1f1f1f',
		lineHeight: 21,
	},
	noteCount: {
		alignSelf: 'flex-end',
		fontSize: 12,
		color: '#C4C4C4',
		marginTop: 4,
	},

	sensorInfoCard: {
		flexDirection: 'row',
		backgroundColor: '#F7FBF7',
		borderWidth: 1,
		borderColor: '#DCEFDC',
		borderRadius: 12,
		padding: 12,
		marginTop: 16,
	},
	sensorInfoText: {
		fontSize: 12,
		color: '#5A8A5A',
		lineHeight: 18,
	},

	submitButton: {
		marginTop: 22,
		backgroundColor: '#7fc77c',
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
	},
	submitButtonDisabled: { backgroundColor: '#D8D8D8' },
	submitButtonText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
	},

	emptyText: {
		textAlign: 'center',
		color: '#A7A7A7',
		fontSize: 14,
		marginTop: 40,
	},
});