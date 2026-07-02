import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		paddingTop: 16,
	},
	detailContent: {
		paddingBottom: 28,
	},
	detailCard: {
		padding: 16,
		borderRadius: 20,
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#F0F0F0',
		gap: 12,
	},
	detailTitle: {
		fontSize: 20,
		fontWeight: '800',
		color: '#1f1f1f',
		lineHeight: 28,
	},
	detailMetaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	detailImage: {
		width: '100%',
		height: 220,
		borderRadius: 16,
		backgroundColor: '#EFEFEF',
	},
	detailImagePlaceholder: {
		width: '100%',
		height: 220,
		borderRadius: 16,
		backgroundColor: '#EFEFEF',
	},
	detailText: {
		fontSize: 15,
		lineHeight: 23,
		color: '#505050',
	},
	detailActionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		marginTop: 8,
		paddingVertical: 14,
		borderRadius: 14,
		backgroundColor: '#7fc77c',
	},
	detailActionText: {
		fontSize: 14,
		fontWeight: '700',
		color: '#FFFFFF',
	},
	writeContent: {
		paddingBottom: 28,
	},
	writeLabel: {
		fontSize: 13,
		fontWeight: '700',
		color: '#333333',
		marginBottom: 8,
		marginTop: 10,
	},
	categoryWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	writeCategoryPill: {
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 20,
		backgroundColor: '#F5F5F5',
	},
	writeCategoryPillActive: {
		backgroundColor: '#7fc77c',
	},
	writeCategoryText: {
		fontSize: 13,
		fontWeight: '600',
		color: '#8f8f8f',
	},
	writeCategoryTextActive: {
		color: '#FFFFFF',
	},
	writeInput: {
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		backgroundColor: '#FAFAFA',
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 15,
		color: '#1f1f1f',
	},
	writeTextarea: {
		minHeight: 180,
		textAlignVertical: 'top',
	},
	writeSubmitButton: {
		marginTop: 20,
		borderRadius: 16,
		backgroundColor: '#7fc77c',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
	},
	writeSubmitText: {
		fontSize: 15,
		fontWeight: '800',
		color: '#FFFFFF',
	},

	// 카테고리 필터
	categoryScroll: {
		flexGrow: 0,
		marginBottom: 12,
	},
	categoryScrollContent: {
		gap: 8,
		paddingRight: 8,
	},
	categoryPill: {
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 20,
		backgroundColor: '#F5F5F5',
	},
	categoryPillActive: {
		backgroundColor: '#7fc77c',
	},
	categoryPillText: {
		fontSize: 13,
		fontWeight: '600',
		color: '#8f8f8f',
	},
	categoryPillTextActive: {
		color: '#ffffff',
	},

	// 정렬
	sortRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 14,
		marginBottom: 12,
	},
	sortOption: {
		paddingVertical: 4,
	},
	sortText: {
		fontSize: 13,
		fontWeight: '500',
		color: '#C4C4C4',
	},
	sortTextActive: {
		color: '#1f1f1f',
		fontWeight: '700',
	},

	// 게시글 리스트
	listContent: {
		gap: 12,
		paddingBottom: 100,
	},
	postCard: {
		flexDirection: 'row',
		padding: 14,
		borderRadius: 18,
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#F0F0F0',
	},
	postImage: {
		width: 64,
		height: 64,
		borderRadius: 12,
		marginRight: 14,
		resizeMode: 'cover',
		backgroundColor: '#EFEFEF',
	},
	postImagePlaceholder: {
		width: 64,
		height: 64,
		borderRadius: 12,
		marginRight: 14,
		backgroundColor: '#F0F0F0',
		alignItems: 'center',
		justifyContent: 'center',
	},
	postTextWrap: {
		flex: 1,
		justifyContent: 'center',
	},

	// 카테고리 뱃지
	categoryBadge: {
		alignSelf: 'flex-start',
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 6,
		backgroundColor: '#E8F7EF',
		marginBottom: 4,
	},
	categoryBadgeText: {
		fontSize: 10,
		fontWeight: '700',
		color: '#7fc77c',
	},

	postTitle: {
		fontSize: 15,
		fontWeight: '700',
		color: '#1f1f1f',
		marginBottom: 4,
	},
	postPreview: {
		fontSize: 13,
		fontWeight: '400',
		color: '#8f8f8f',
		lineHeight: 18,
		marginBottom: 8,
	},

	// 메타 정보 (날짜, 조회수, 댓글수)
	metaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	metaDate: {
		fontSize: 11,
		fontWeight: '500',
		color: '#C4C4C4',
	},
	metaIconGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
	},
	metaCount: {
		fontSize: 11,
		fontWeight: '600',
		color: '#A7A7A7',
		marginRight: 8,
	},

	emptyText: {
		textAlign: 'center',
		color: '#A7A7A7',
		fontSize: 14,
		marginTop: 40,
	},

	// 글쓰기 버튼
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
});