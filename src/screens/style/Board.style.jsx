import { StyleSheet } from 'react-native';

export default StyleSheet.create({

	// ============================================================
	// 공통 컨테이너
	// ============================================================
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20,
		paddingTop: 14,
	},

	// ============================================================
	// [BoardDetail.jsx] 게시글 상세 화면
	// ============================================================
	detailContent: {
		paddingBottom: 28,
	},
	detailCard: {
		padding: 5,
		gap: 12,
	},
	detailTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#1F2937',
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
		backgroundColor: '#E5E7EB',
	},
	detailText: {
		fontSize: 14,
		lineHeight: 23,
		color: '#6B7280',
	},
	detailActionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		marginTop: 4,
		paddingVertical: 10,
		borderRadius: 8,
		backgroundColor: '#7FC77C',
	},
	detailActionText: {
		fontSize: 12,
		fontWeight: '700',
		color: '#FFFFFF',
	},
	detailActionRow: {
		flexDirection: 'row',
		gap: 10,
	},
	detailActionButtonHalf: {
		flex: 1,
		marginTop: 0,
	},
	detailImageScroll: {
		marginBottom: 4,
	},
	detailImageMulti: {
		width: 260,
		height: 220,
		borderRadius: 16,
		backgroundColor: '#E5E7EB',
		marginRight: 10,
	},

	// ============================================================
	// [BoardWrite.jsx] 글쓰기 / 수정 화면
	// 통일: 라벨-위 배치 (writeRow/writeContentWrap 더 이상 사용 안 함)
	// ============================================================
	writeContent: {
		paddingBottom: 28,
	},
	writeLabell: {
		fontSize: 15,
		fontWeight: '500',
		color: '#9CA3AF',
		marginBottom: 8,
	},
	writeLabel: {
		fontSize: 15,
		fontWeight: '500',
		color: '#9CA3AF',
		marginTop: 18,
		marginBottom: 8,
	},
	writeLabelOpt: {
		fontSize: 12,
		fontWeight: '400',
		color: '#9CA3AF',
	},

	// 통일: 카테고리 칩 (일지 mood칩 방식, border 1.5 + radius 20)
	categoryWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	writeCategoryPill: {
		borderWidth: 1,
		borderColor: '#7FC77C',
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: '#FFFFFF',
	},
	writeCategoryPillActive: {
		backgroundColor: '#7FC77C',
		borderColor: '#7FC77C',
	},
	writeCategoryText: {
		color: '#7FC77C',
		fontWeight: '500',
		fontSize: 14,
	},
	writeCategoryTextActive: {
		color: '#FFFFFF',
		fontWeight: '600',
	},

	// 통일: 밑줄 → 테두리 박스 입력창
	writeInput: {
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 10,
		fontSize: 15,
		paddingHorizontal: 12,
		paddingVertical: 10,
		color: '#1F2937',
		backgroundColor: '#FFFFFF',
	},
	writeTextarea: {
		minHeight: 160,
		textAlignVertical: 'top',
	},

	writeSubmitButton: {
		marginTop: 22,
		borderRadius: 16,
		backgroundColor: '#7FC77C',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
	},
	writeSubmitButtonDisabled: {
		backgroundColor: '#E5E7EB',
	},
	writeSubmitText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
	},

	// ============================================================
	// [Board.jsx / BoardWrite.jsx / DiseasePredict.jsx / PlantRegister.jsx]
	// 통일: 사진 등록 (일지 방식 기반, 사용자 지정 사이즈로 수정)
	// photoAddBox의 width:'100%'는 가로 스크롤과 안 맞아서,
	// BoardWrite는 ScrollView(horizontal) 대신 flexWrap:'wrap'인 일반 View로 변경함
	// ============================================================
	photoRow: {
		flexDirection: 'row',
		flexWrap: 'wrap', // 5장까지 들어가야 해서 줄바꿈 추가 (필수)
		gap: 8,
	},
	photoThumbWrap: {
		position: 'relative',
	},
	photoThumb: {
		width: 150,
		height: 150,
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
	// [Board.jsx] 게시판 목록 화면 - 상단 카테고리 필터
	// ============================================================
	postList: {
		flex: 1,
	},
	categoryScroll: {
		flexGrow: 0,
		flexShrink: 0,
		marginBottom: 4,
	},
	categoryScrollContent: {
		alignItems: 'flex-start',
	},

	tabRow: {
		flexDirection: 'row',
		flexShrink: 0,
	},
	tabItem: {
		paddingBottom: 8,
		marginRight: 18,
	},
	tabText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#9CA3AF',
	},
	tabTextActive: {
		color: '#1F2937',
	},
	tabUnderline: {
		marginTop: 6,
		height: 2,
		borderRadius: 1,
		backgroundColor: '#7FC77C',
	},

	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 검색창
	// ============================================================
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 14,
		backgroundColor: '#E5E7EB',
		marginBottom: 8,
		flexShrink: 0,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		color: '#1F2937',
		padding: 0,
	},

	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 정렬(최신순/인기순)
	// ============================================================
	sortRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 14,
		marginBottom: 8,
		flexShrink: 0,
	},
	sortOption: {
		paddingVertical: 4,
	},
	sortText: {
		fontSize: 12,
		fontWeight: '500',
		color: '#9CA3AF',
	},
	sortTextActive: {
		color: '#1F2937',
		fontWeight: '700',
	},

	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 게시글 카드 리스트
	// ============================================================
	listContent: {
		gap: 12,
		paddingBottom: 100,
	},
	postCard: {
		flexDirection: 'row',
		padding: 14,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
	postImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		marginLeft: 14,
		marginTop: 8,
		resizeMode: 'cover',
		backgroundColor: '#E5E7EB',
	},
	postTextWrap: {
		flex: 1,
		justifyContent: 'center',
	},

	// ============================================================
	// 카테고리 뱃지
	// ============================================================
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
		color: '#7FC77C',
	},

	// ============================================================
	// [Board.jsx] 게시글 카드 - 제목/미리보기/메타정보
	// ============================================================
	postTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#1F2937',
		marginBottom: 4,
	},
	postPreview: {
		fontSize: 12,
		fontWeight: '400',
		color: '#6B7280',
		lineHeight: 18,
		marginBottom: 8,
	},
	metaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	metaDate: {
		fontSize: 11,
		fontWeight: '500',
		color: '#9CA3AF',
	},
	metaIconGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	metaCount: {
		fontSize: 11,
		fontWeight: '500',
		color: '#9CA3AF',
	},

	// ============================================================
	// [Board.jsx] 게시글이 하나도 없거나 검색 결과가 없을 때
	// ============================================================
	emptyText: {
		textAlign: 'center',
		color: '#9CA3AF',
		fontSize: 14,
		marginTop: 40,
	},

	// ============================================================
	// [Board.jsx] 우측 하단 동그란 "글쓰기" 버튼 (+)
	// ============================================================
	writeButton: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: '#7FC77C',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 4,
	},

	// ============================================================
	// [BoardDetail.jsx] 댓글 섹션
	// ============================================================
	sectionDivider: {
		height: 1,
		backgroundColor: '#E5E7EB',
		marginVertical: 4,
	},
	commentSectionTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1F2937',
	},
	commentEmptyText: {
		fontSize: 13,
		color: '#9CA3AF',
	},
	commentItem: {
		paddingBottom: 12,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
	},
	commentHeaderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	commentAuthor: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1F2937',
	},
	commentDate: {
		fontSize: 11,
		fontWeight: '500',
		color: '#9CA3AF',
	},
	commentContent: {
		fontSize: 14,
		color: '#6B7280',
		marginTop: 4,
		lineHeight: 20,
	},
	commentActionRow: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 6,
	},
	commentReplyBtn: {
		fontSize: 12,
		fontWeight: '600',
		color: '#7FC77C',
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
		borderLeftColor: '#E5E7EB',
	},
	replyInputRow: {
		flexDirection: 'row',
		marginTop: 8,
		gap: 8,
	},
	replyInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 6,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 14,
		color: '#1F2937',
	},
	commentInputRow: {
		flexDirection: 'row',
		marginVertical: 6,
		gap: 8,
	},
	commentInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 6,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 14,
		color: '#1F2937',
	},
	commentSubmitBtn: {
		backgroundColor: '#7FC77C',
		borderRadius: 6,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
	commentSubmitBtnText: {
		color: '#FFFFFF',
		fontWeight: '500',
		fontSize: 14,
	},
});