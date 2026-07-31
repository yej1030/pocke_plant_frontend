import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // 프로필 영역: 아바타 원 + 닉네임/이메일을 가로로 배치
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    marginLeft: 2,
  },

  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8F7EF', // 연한 초록 (앱 포인트 컬러 톤)
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7fc77c',
  },

  profileTextWrap: {
    flex: 1,
  },

  name: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111',
  },

  email: {
    marginTop: 2,
    fontSize: 14,
    color: '#8b8b8b',
  },

  groupTitle: {
    fontSize: 14,
    fontWeight: '700', // 500 → 700, 섹션 제목이 더 잘 보이도록
    color: '#7a7a7a',  // 999 → 살짝 진하게
    marginBottom: 6,
    marginLeft: 8,
  },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#ececec',
  },

  menuText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },

  subText: {
    marginTop: 2,
    fontSize: 13,
    color: '#999',
  },

  arrowIcon: {
    width: 18,
    height: 18,
    opacity: 0.6,
  },

  logoutButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#d87b7b',
    borderRadius: 8,
    backgroundColor: '#fff4f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#c25555',
    fontSize: 18,
    fontWeight: '700',
  },

  deleteButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#d87b7b',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  deleteText: {
    color: '#c25555',
    fontSize: 18,
    fontWeight: '700',
  },

});