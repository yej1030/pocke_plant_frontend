import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20,
		paddingTop: 14,
	},

	sectionBadge: {
		fontSize: 12,
		fontWeight: '600',
		color: '#7FC77C',
		backgroundColor: '#E8F7EF',
		alignSelf: 'flex-start',
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 20,
		marginBottom: 12,
	},

	loadingWrap: {
		paddingTop: 60,
		alignItems: 'center',
	},

	emptyWrap: {
		paddingVertical: 60,
		alignItems: 'center',
	},

	emptyText: {
		fontSize: 14,
		color: '#6B7280',
		textAlign: 'center',
	},

	emptySubText: {
		fontSize: 12,
		color: '#9CA3AF',
		marginTop: 6,
		textAlign: 'center',
	},

	// ============================================================
	// 식물별 친밀도 카드
	// ============================================================
	affCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		padding: 14,
        paddingVertical: 10,
		marginBottom: 10,
	},

	affCardTop: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},

	affPlantInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	affPlantImage: {
		width: 56,
		height: 56,
		resizeMode: 'contain',
		borderRadius: 32,
		backgroundColor: '#F2FBF6',
		borderWidth: 1,
		borderColor: '#DFF0E6',
	},

	affPlantName: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1F2937',
	},

	tierBadge: {
		backgroundColor: '#E8F7EF',
		paddingHorizontal: 9,
		paddingVertical: 3,
		borderRadius: 20,
	},

	tierBadgeText: {
		fontSize: 11,
		fontWeight: '700',
		color: '#1F2937',
	},

	gaugeTrack: {
		height: 8,
		borderRadius: 999,
		backgroundColor: '#E5E7EB',
		overflow: 'hidden',
		marginBottom: 6,
	},

	gaugeFill: {
		height: '100%',
		borderRadius: 999,
		backgroundColor: '#7FC77C',
	},

	affCardBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	affExpText: {
		fontSize: 11,
		color: '#9CA3AF',
	},

	affTodayUp: {
		fontSize: 11,
		fontWeight: '600',
		color: '#7FC77C',
	},

	affTodayNone: {
		fontSize: 11,
		color: '#9CA3AF',
	},

	// ============================================================
	// 친밀도 올리는 방법 안내 카드
	// ============================================================
	guideCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		padding: 14,
        paddingVertical: 10,
		marginTop: 6,
	},

	guideTitle: {
		fontSize: 13,
		fontWeight: '700',
		color: '#1F2937',
		marginBottom: 10,
	},

	guideRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 8,
	},

	guideIcon: {
		fontSize: 14,
	},

	guideLabel: {
		flex: 1,
		fontSize: 12,
		color: '#6B7280',
	},

	guidePoints: {
		fontSize: 12,
		fontWeight: '700',
		color: '#7FC77C',
	},

    // 하드코딩
    emptySubText: {
	fontSize: 12,
	color: '#9CA3AF',
	marginTop: 6,
	textAlign: 'center',
},
});