import { StyleSheet } from 'react-native';

export default StyleSheet.create({

	// ============================================================
	// 공통 컨테이너
	// - Board.jsx / BoardDetail.jsx / BoardWrite.jsx 전체 화면 배경
	// ============================================================
	container: {
		flex: 1,
		backgroundColor: '#ffffff', // 화면 전체 배경색 (흰색)
		paddingHorizontal: 20,       // 화면 좌우 여백
		paddingTop: 16,              // 헤더 아래 여백
	},


	// ============================================================
	// [BoardDetail.jsx] 게시글 상세 화면
	// ============================================================

	// ScrollView의 contentContainerStyle (스크롤 영역 안쪽 하단 여백)
	detailContent: {
		paddingBottom: 28,
	},

	// 게시글 본문을 감싸는 카드 (배지+제목+날짜+이미지+본문+버튼이 다 이 안에 있음)
	detailCard: {
		padding: 5,
		gap: 12,                    // 카드 안 요소들(배지, 제목, 이미지 등) 사이 세로 간격
	},

	// 게시글 제목 텍스트
	detailTitle: {
		fontSize: 20,
		fontWeight: '800',   // 매우 두껍게
		color: '#1f1f1f',    // 진한 검정
		lineHeight: 28,
	},

	// 날짜 + 조회수/댓글수를 한 줄에 좌우로 배치하는 행
	detailMetaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between', // 왼쪽엔 날짜, 오른쪽엔 조회수/댓글
		alignItems: 'center',
	},

	// 사진이 1장일 때 보여주는 대표 이미지 (imageUri 단일)
	detailImage: {
		width: '100%',
		height: 220,
		borderRadius: 16,
		backgroundColor: '#EFEFEF', // 이미지 로딩 전 배경색
	},

	// 게시글 본문 텍스트
	detailText: {
		fontSize: 15,
		lineHeight: 23,
		color: '#505050', // 진한 회색 (제목보다 연함)
	},

	// "이 글 수정하기" / "삭제하기" 버튼 (초록색 기본, 삭제는 코드에서 배경색 빨강으로 덮어씀)
	detailActionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,               // 아이콘과 텍스트 사이 간격
		marginTop: 4,
		paddingVertical: 10,
		borderRadius: 8,
		backgroundColor: '#7fc77c', // 기본 초록색 (수정 버튼). 삭제 버튼은 컴포넌트에서 #E74C3C로 덮어씀
	},

	// 수정/삭제 버튼 안의 텍스트
	detailActionText: {
		fontSize: 12,
		fontWeight: '700',
		color: '#FFFFFF', // 흰색 글씨
	},

	// 수정하기/삭제하기 버튼 두 개를 가로로 나란히 배치하는 행
	detailActionRow: {
		flexDirection: 'row',
		gap: 10, // 두 버튼 사이 간격
	},

	// detailActionButton 위에 덮어씌워서 폭을 절반씩 나눠 갖게 함
	detailActionButtonHalf: {
		flex: 1,
		marginTop: 0, // 이미 detailActionRow에서 위치 잡으니 개별 marginTop은 제거
	},

	// 사진이 여러 장(imageUris)일 때, 가로 스크롤되는 ScrollView 자체 스타일
	detailImageScroll: {
		marginBottom: 4,
	},

	// 사진이 여러 장일 때 각각의 썸네일 (가로로 나열됨)
	detailImageMulti: {
		width: 260,
		height: 220,
		borderRadius: 16,
		backgroundColor: '#EFEFEF',
		marginRight: 10, // 다음 사진과의 간격
	},


	// ============================================================
	// [BoardWrite.jsx] 글쓰기 / 수정 화면
	// (PlantRegister 화면의 "왼쪽 라벨 + 오른쪽 입력창" 레이아웃을 참고해서 만듦)
	// ============================================================

	// ScrollView의 contentContainerStyle
	writeContent: {
		paddingBottom: 28,
	},

	// "제목 / 내용 / 카테고리 / 사진" 각 항목을 감싸는 한 줄(행) 전체
	writeRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 20, // 다음 항목(행)과의 간격
	},

	// 각 행 왼쪽에 있는 라벨 텍스트 ("제목", "내용", "카테고리", "사진")
	writeLabel: {
		width: 70,             // 라벨 영역 고정 너비 (이 값 때문에 오른쪽 입력창들이 세로로 열맞춰짐)
		color: '#b0b0b0',      // 연한 회색 (입력창보다 흐리게)
		textAlign: 'center',
		fontSize: 15,
		paddingRight: 16,
		paddingTop: 8,
	},

	// 각 행에서 라벨을 제외한 오른쪽 전체 영역 (입력창, 카테고리 버튼들, 사진 목록이 여기 들어감)
	writeContentWrap: {
		flex: 1,
	},

	// 카테고리 선택 버튼(pill)들을 감싸는 행 — 자동 줄바꿈됨
	categoryWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8, // 버튼 사이 간격
	},

	// 카테고리 버튼 하나하나 (선택 안 된 상태)
	writeCategoryPill: {
		borderWidth: 1,
		borderColor: '#7fc77c',   // 초록 테두리
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: '#fff',   // 선택 안 됐을 땐 흰 배경
	},

	// 카테고리 버튼 - 선택된 상태일 때 writeCategoryPill 위에 덮어씌워지는 스타일
	writeCategoryPillActive: {
		backgroundColor: '#7fc77c', // 선택되면 배경이 초록으로 꽉 참
		borderColor: '#7fc77c',
	},

	// 카테고리 버튼 텍스트 (선택 안 된 상태)
	writeCategoryText: {
		color: '#7fc77c',   // 초록 글씨
		fontWeight: '500',
		fontSize: 14,
	},

	// 카테고리 버튼 텍스트 - 선택된 상태
	writeCategoryTextActive: {
		color: '#fff',      // 선택되면 흰 글씨로 바뀜
		fontWeight: '700',
	},

	// 제목 입력창 (한 줄짜리 TextInput)
	writeInput: {
		borderBottomWidth: 1,   // 밑줄만 있는 스타일 (박스 테두리 없음)
		borderColor: '#e0e0e0',
		fontSize: 15,
		paddingVertical: 8,
		paddingLeft: 8,
		color: '#222',
		backgroundColor: 'transparent',
		width: '98%',
	},

	// 내용 입력창 — writeInput 위에 추가로 덮어씌워지는 스타일 (여러 줄 textarea)
	writeTextarea: {
		minHeight: 160,           // 최소 높이 (여러 줄 입력 가능하게)
		textAlignVertical: 'top', // 안드로이드에서 텍스트가 위쪽부터 시작하게
		borderWidth: 1,           // textarea는 밑줄 대신 박스 테두리 전체
		borderColor: '#e0e0e0',
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingTop: 10,
	},

	// "게시하기" 버튼 (활성 상태 - 제목/내용/카테고리 다 채워졌을 때)
	writeSubmitButton: {
		marginTop: 6,
		marginHorizontal: 4,
		borderRadius: 16,
		backgroundColor: '#7fc77c', // 초록색
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
	},

	// "게시하기" 버튼 - 비활성 상태일 때 writeSubmitButton 위에 덮어씌워지는 스타일
	writeSubmitButtonDisabled: {
		backgroundColor: '#D8D8D8', // 회색으로 바뀌어서 "지금 못 누름"을 알려줌
	},

	// "게시하기" 버튼 안의 텍스트
	writeSubmitText: {
		fontSize: 15,
		fontWeight: '800',
		color: '#FFFFFF',
	},


	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 상단 카테고리 필터
	// ============================================================

	postList: {
		flex: 1,
	},

	// 카테고리 필터가 가로로 스크롤되는 ScrollView 자체
	categoryScroll: {
		flexGrow: 0,        // 세로로 늘어나지 않게 고정
		flexShrink: 0,      // 세로로 줄어들지 않게 고정
		marginBottom: 4,
	},

		categoryScrollContent: {
		alignItems: 'flex-start', // 세로로 늘어나지 않게 고정
	},

// ============================================================
	// 공통 밑줄 탭 스타일
	// - Board.jsx 상단 카테고리 필터 (전체/자유/분양/질병)
	// - MyPosts.jsx 포스트/댓글 탭
	// ============================================================
	tabRow: {
		flexDirection: 'row',
		flexShrink: 0,
	},
	tabItem: {
		paddingBottom: 8,
		marginRight: 18,
	},
	tabText: {
		fontSize: 15,
		fontWeight: '600',
		color: '#C4C4C4',
	},
	tabTextActive: {
		color: '#1f1f1f',
	},
	tabUnderline: {
		marginTop: 6,
		height: 2,
		borderRadius: 1,
		backgroundColor: '#7fc77c',
	},


	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 검색창
	// ============================================================

	// 검색 아이콘 + 입력창 + X버튼을 감싸는 전체 박스
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 14,
		backgroundColor: '#F5F5F5', // 연한 회색 배경
		marginBottom: 8,
		flexShrink: 0, // 세로로 줄어들지 않게 고정
	},

	// 검색어 입력하는 TextInput 자체 (검색 아이콘 옆)
	searchInput: {
		flex: 1,           // 남는 공간 다 차지
		fontSize: 14,
		color: '#1f1f1f',
		padding: 0,        // 기본 패딩 제거 (searchBar에서 이미 패딩 줌)
	},


	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 정렬(최신순/인기순)
	// ============================================================

	// "최신순 / 인기순" 버튼 두 개를 오른쪽 정렬로 배치하는 행
	sortRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end', // 오른쪽 끝에 붙임
		gap: 14,
		marginBottom: 8,
		flexShrink: 0, // 세로로 줄어들지 않게 고정
	},

	// 정렬 버튼 하나 (텍스트만 있고 배경 없음)
	sortOption: {
		paddingVertical: 4,
	},

	// 정렬 버튼 텍스트 - 선택 안 된 상태
	sortText: {
		fontSize: 13,
		fontWeight: '500',
		color: '#C4C4C4', // 연한 회색
	},

	// 정렬 버튼 텍스트 - 선택된 상태 (지금 적용 중인 정렬)
	sortTextActive: {
		color: '#1f1f1f',   // 진한 검정으로 바뀜
		fontWeight: '700',
	},


	// ============================================================
	// [Board.jsx] 게시판 목록 화면 - 게시글 카드 리스트
	// ============================================================

	// FlatList의 contentContainerStyle (카드들 사이 간격, 리스트 하단 여백)
	listContent: {
		gap: 12,            // 카드와 카드 사이 세로 간격
		paddingBottom: 100, // 하단 글쓰기 버튼(writeButton)에 안 가리도록 여유 공간
	},

	// 게시글 카드 하나 전체 (제목/내용/메타정보 + 오른쪽 이미지)
	postCard: {
		flexDirection: 'row', // 텍스트는 왼쪽, 이미지는 오른쪽
		padding: 14,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#F0F0F0',
	},

	// 카드 오른쪽에 붙는 썸네일 이미지 (사진 있는 글만 표시됨)
	postImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		marginLeft: 14,        // 텍스트 영역과의 간격
marginTop: 8,         // 카드 안에서 위쪽 여백 (텍스트 영역과 수평 맞추기)
		resizeMode: 'cover',
		backgroundColor: '#EFEFEF',
	},

	// 카드 왼쪽 텍스트 영역 전체 (배지+제목+미리보기+메타정보)
	postTextWrap: {
		flex: 1,               // 이미지 뺀 나머지 공간 다 차지
		justifyContent: 'center',
	},


	// ============================================================
	// 카테고리 뱃지 (Board.jsx 카드 안 + BoardDetail.jsx 상세화면 둘 다 사용)
	// ============================================================

	// "자유 게시판" 같은 작은 초록색 뱃지 배경
	categoryBadge: {
		alignSelf: 'flex-start', // 내용물 크기만큼만 차지 (가로로 안 늘어남)
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 6,
		backgroundColor: '#E8F7EF', // 연한 초록 배경
		marginBottom: 4,
	},

	// 뱃지 안의 텍스트
	categoryBadgeText: {
		fontSize: 10,
		fontWeight: '700',
		color: '#7fc77c', // 진한 초록 글씨
	},


	// ============================================================
	// [Board.jsx] 게시글 카드 - 제목/미리보기/메타정보
	// ============================================================

	// 카드 안 게시글 제목 (1줄만 표시, numberOfLines={1})
	postTitle: {
		fontSize: 15,
		fontWeight: '700',
		color: '#1f1f1f',
		marginBottom: 4,
	},

	// 카드 안 게시글 내용 미리보기 (2줄까지 표시, numberOfLines={2})
	postPreview: {
		fontSize: 13,
		fontWeight: '400',
		color: '#8f8f8f', // 연한 회색
		lineHeight: 18,
		marginBottom: 8,
	},

	// 날짜 + 조회수/댓글수를 담는 행
	// (Board.jsx 카드 안 + BoardDetail.jsx 상세 화면 상단 둘 다 사용)
	metaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8, // 날짜와 조회수/댓글 그룹 사이 간격
	},

	// 날짜 텍스트 ("7월 26일" 형식)
	metaDate: {
		fontSize: 11,
		fontWeight: '500',
		color: '#C4C4C4', // 연한 회색
	},

	// 조회수 아이콘+숫자, 댓글 아이콘+숫자를 감싸는 행
	metaIconGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6, // 아이콘-숫자-아이콘-숫자 사이 간격
	},

	// 조회수/댓글수 숫자 텍스트
	metaCount: {
		fontSize: 11,
		fontWeight: '600',
		color: '#A7A7A7',
	},


	// ============================================================
	// [Board.jsx] 게시글이 하나도 없거나 검색 결과가 없을 때
	// ============================================================
	emptyText: {
		textAlign: 'center',
		color: '#A7A7A7',
		fontSize: 14,
		marginTop: 40,
	},


	// ============================================================
	// [Board.jsx] 우측 하단 동그란 "글쓰기" 버튼 (+)
	// ============================================================
	writeButton: {
		position: 'absolute',  // 화면에 떠있는 버튼
		bottom: 20,
		right: 20,
		width: 52,
		height: 52,
		borderRadius: 26,      // width/height의 절반 = 완전한 원
		backgroundColor: '#7fc77c',
		alignItems: 'center',
		justifyContent: 'center',
		// 그림자 효과 (버튼이 떠있는 느낌)
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 4, // 안드로이드용 그림자
	},


	// ============================================================
	// [BoardDetail.jsx] 댓글 섹션
	// ============================================================

	// 본문(수정/삭제 버튼 영역)과 댓글 섹션 사이 구분선
	sectionDivider: {
		height: 1,
		backgroundColor: '#F0F0F0',
		marginVertical: 4,
	},

	// "댓글 N" 제목
	commentSectionTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#1f1f1f',
	},

	// 댓글이 하나도 없을 때 "아직 댓글이 없습니다" 문구
	commentEmptyText: {
		fontSize: 13,
		color: '#A7A7A7',
	},

	// 댓글 하나를 감싸는 박스 (최상위 댓글 기준)
	commentItem: {
		paddingBottom: 12,
		paddingHorizontal: 8,
		borderBottomWidth: 1,       // 아래쪽 얇은 구분선
		borderBottomColor: '#F0F0F0',
	},

	// 댓글 작성자 + 날짜를 좌우로 배치하는 행 (댓글/답글 공통 사용)
	commentHeaderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	// 댓글 작성자 이름(아이디) 텍스트
	commentAuthor: {
		fontSize: 13,
		fontWeight: '700',
		color: '#1f1f1f',
	},

	// 댓글 작성 날짜 텍스트
	commentDate: {
		fontSize: 11,
		color: '#C4C4C4',
	},

	// 댓글 본문 텍스트 (댓글/답글 공통 사용)
	commentContent: {
		fontSize: 14,
		color: '#505050',
		marginTop: 4,
		lineHeight: 20,
	},

	// "답글" / "삭제" 버튼을 나란히 배치하는 행
	commentActionRow: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 6,
	},

	// "답글" 버튼 텍스트
	commentReplyBtn: {
		fontSize: 12,
		fontWeight: '600',
		color: '#7fc77c', // 초록
	},

	// "삭제" 버튼 텍스트 (댓글/답글 공통 사용)
	commentDeleteBtn: {
		fontSize: 12,
		fontWeight: '600',
		color: '#E74C3C', // 빨강 (경고색)
	},

	// 답글 하나를 감싸는 박스 - 최상위 댓글보다 들여쓰기 되어 보이도록
	replyItem: {
		marginLeft: 20,             // 왼쪽으로 들여쓰기
		marginTop: 10,
		paddingLeft: 12,
		borderLeftWidth: 2,          // 왼쪽에 세로선 (댓글에 딸린 답글임을 시각적으로 표시)
		borderLeftColor: '#F0F0F0',
	},

	// "답글" 버튼 눌렀을 때 나오는 입력창 + 등록버튼을 감싸는 행
	replyInputRow: {
		flexDirection: 'row',
		marginTop: 8,
		gap: 8,
	},

	// 답글 입력 TextInput
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

	// 화면 맨 아래, 새 댓글을 작성하는 입력창 + 등록버튼을 감싸는 행
	commentInputRow: {
		flexDirection: 'row',
		marginVertical: 6,
		gap: 8,
	},

	// 새 댓글 입력 TextInput (replyInput보다 조금 더 큼)
	commentInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderRadius: 6,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 14,
		color: '#1f1f1f',
	},

	// "등록" 버튼 (댓글/답글 공통 사용) - 초록 배경
	commentSubmitBtn: {
		backgroundColor: '#7fc77c',
		borderRadius: 6,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},

	// "등록" 버튼 안 텍스트
	commentSubmitBtnText: {
		color: '#ffffff',
		fontWeight: '700',
		fontSize: 13,
	},


	// ============================================================
	// [BoardWrite.jsx] 여러 장 사진 업로드 UI
	// ============================================================

	// 썸네일들 + "추가하기" 박스를 담는 가로 스크롤 컨텐츠 정렬
	imageListContent: {
		gap: 10,          // 썸네일 사이 간격
		paddingRight: 8,
	},

	// 썸네일 하나를 감싸는 wrapper (우측 상단 X 버튼을 절대위치로 올리기 위한 기준)
	imageThumbWrap: {
		position: 'relative',
	},

	// 실제 사진 썸네일 이미지
	imageThumb: {
		width: 84,
		height: 84,
		borderRadius: 12,
		backgroundColor: '#EFEFEF',
	},

	// 썸네일 우측 상단에 뜨는 X(삭제) 버튼 - 동그란 반투명 검정 배경
	imageRemoveBtn: {
		position: 'absolute',
		top: -6,             // 썸네일 모서리 밖으로 살짝 튀어나오게
		right: -6,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#00000099', // 반투명 검정
		alignItems: 'center',
		justifyContent: 'center',
	},

	// "사진 추가하기" 점선 박스 (MAX_IMAGES 안 채웠을 때만 표시됨)
	imageAddBox: {
		width: 84,
		height: 84,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderStyle: 'dashed',    // 점선 테두리
		backgroundColor: '#FAFAFA',
		alignItems: 'center',
		justifyContent: 'center',
	},

	// "사진 추가하기" 박스 안의 "0/5" 같은 숫자 텍스트
	imageAddBoxText: {
		fontSize: 11,
		fontWeight: '600',
		color: '#C4C4C4',
		marginTop: 4,
	},
});