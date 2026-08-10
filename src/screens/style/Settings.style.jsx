import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#E8F7EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7FC77C',
  },

  profileTextWrap: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },

  email: {
    fontSize: 14,
    color: '#6B7280',
  },

  groupTitle: {
    fontSize: 15,
    fontWeight: '500', 
    color: '#6B7280',  
    marginBottom: 6,
    marginLeft: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    backgroundColor: '#E5E7EB',
  },

  menuText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '400',
  },

  subText: {
    marginTop: 2,
    fontSize: 12,
    color: '#9CA3AF',
  },

  arrowIcon: {
    width: 18,
    height: 18,
    opacity: 0.6,
  },

  logoutButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#D87B7B',
    borderRadius: 8,
    backgroundColor: '#FFF4F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#C25555',
    fontSize: 16,
    fontWeight: '700',
  },

  deleteButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#D87B7B',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  deleteText: {
    color: '#C25555',
    fontSize: 16,
    fontWeight: '700',
  },

});