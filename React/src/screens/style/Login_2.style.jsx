import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  // 헤더 스타일
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  emptySpace: {
    width: 24,
  },
  // 본문 스타일
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
    color: '#333',
  },
  // 메인 로그인 버튼
  loginSubmitButton: {
    width: '100%',
    backgroundColor: '#5CD79E', // 기존 소스에 있던 Pocket Plants 메인 컬러
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginSubmitText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  // 하단 링크
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingHorizontal: 2,
  },
  linkText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
  },
});