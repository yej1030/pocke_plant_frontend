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
		alignItems: 'center',
		justifyContent: 'center',
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

	// PlantRegister 스타일의 row/label 레이아웃
	writeRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 22,
	},
	writeLabel: {
		width: 70,
		color: '#b0b0b0',
		textAlign: 'center',
		fontSize: 15,
		paddingRight: 16,
		paddingTop: 8,
	},
	writeContentWrap: {
		flex: 1,
	},

	categoryWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	writeCategoryPill: {
		borderWidth: 1,
		borderColor: '#7fc77c',
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: '#fff',
	},
	writeCategoryPillActive: {
		backgroundColor: '#7fc77c',
		borderColor: '#7fc77c',
	},
	writeCategoryText: {
		color: '#7fc77c',
		fontWeight: '500',
		fontSize: 14,
	},
	writeCategoryTextActive: {
		color: '#fff',
		fontWeight: '700',
	},

	writeInput: {
		borderBottomWidth: 1,
		borderColor: '#e0e0e0',
		fontSize: 15,
		paddingVertical: 8,
		paddingLeft: 8,
		color: '#222',
		backgroundColor: 'transparent',
		width: '98%',
	},
	writeTextarea: {
		minHeight: 160,
		textAlignVertical: 'top',
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingTop: 10,
	},

	writeImageBox: {
		width: '100%',
		height: 180,
		borderRadius: 16,
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderStyle: 'dashed',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 4,
	},
	writeImageBoxText: {
		fontSize: 13,
		fontWeight: '600',
		color: '#B8B8B8',
		marginTop: 8,
	},
	writeSelectedImage: {
		width: '100%',
		height: 180,
		borderRadius: 16,
		backgroundColor: '#EFEFEF',
		marginBottom: 4,
	},

	writeSubmitButton: {
		marginTop: 12,
		marginHorizontal: 16,
		borderRadius: 16,
		backgroundColor: '#7fc77c',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
	},
	writeSubmitButtonDisabled: {
		backgroundColor: '#D8D8D8',
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

	// 검색창
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 14,
		backgroundColor: '#F5F5F5',
		marginBottom: 12,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		color: '#1f1f1f',
		padding: 0,
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
		marginLeft: 14,
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
		alignItems: 'center',
		gap: 8,
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
	
// 댓글 섹션
	commentSectionTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#1f1f1f',
		marginTop: 24,
		marginBottom: 12,
	},
	commentEmptyText: {
		fontSize: 13,
		color: '#A7A7A7',
		marginBottom: 12,
	},
	commentItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#F0F0F0',
	},
	commentHeaderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	commentAuthor: {
		fontSize: 13,
		fontWeight: '700',
		color: '#1f1f1f',
	},
	commentDate: {
		fontSize: 11,
		color: '#C4C4C4',
	},
	commentContent: {
		fontSize: 14,
		color: '#505050',
		marginTop: 4,
		lineHeight: 20,
	},
	commentActionRow: {
		flexDirection: 'row',
		gap: 14,
		marginTop: 6,
	},
	commentReplyBtn: {
		fontSize: 12,
		fontWeight: '600',
		color: '#7fc77c',
	},
	commentDeleteBtn: {
		fontSize: 12,
		fontWeight: '600',
		color: '#E74C3C',
	},
	replyItem: {
		marginLeft: 20,
		marginTop: 10,
		paddingLeft: 12,
		borderLeftWidth: 2,
		borderLeftColor: '#F0F0F0',
	},
	replyInputRow: {
		flexDirection: 'row',
		marginTop: 8,
		gap: 8,
	},
	replyInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 8,
		fontSize: 13,
		color: '#1f1f1f',
	},
	commentInputRow: {
		flexDirection: 'row',
		marginTop: 16,
		gap: 8,
	},
	commentInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 14,
		color: '#1f1f1f',
	},
	commentSubmitBtn: {
		backgroundColor: '#7fc77c',
		borderRadius: 10,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
	commentSubmitBtnText: {
		color: '#ffffff',
		fontWeight: '700',
		fontSize: 13,
	},

	// 여러 장 사진 리스트
	imageListContent: {
		gap: 10,
		paddingRight: 8,
	},
	imageThumbWrap: {
		position: 'relative',
	},
	imageThumb: {
		width: 84,
		height: 84,
		borderRadius: 12,
		backgroundColor: '#EFEFEF',
	},
	imageRemoveBtn: {
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
	imageAddBox: {
		width: 84,
		height: 84,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderStyle: 'dashed',
		backgroundColor: '#FAFAFA',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageAddBoxText: {
		fontSize: 11,
		fontWeight: '600',
		color: '#C4C4C4',
		marginTop: 4,
	},

	detailImageScroll: {
		marginBottom: 4,
	},
	detailImageMulti: {
		width: 260,
		height: 220,
		borderRadius: 16,
		backgroundColor: '#EFEFEF',
		marginRight: 10,
	},
});