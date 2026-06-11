import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // 이메일 input
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 15,
    color: '#333',
  },

  // 비밀번호 row
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 52,
  },

  // 비밀번호 input
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  // 눈 버튼
  eyeButton: {
    paddingLeft: 10,
  },

  // 눈 아이콘
eyeIcon: {
  width: 20,
  height: 20,
},

  // 로그인 버튼
  loginSubmitButton: {
    backgroundColor: '#5CD79E',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },

  loginSubmitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // 소셜 로그인 영역
  socialLoginWrap: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },

  socialLoginLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
    fontWeight: '600',
  },

  // 카카오 원형 버튼
  kakaoRoundButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE500',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  kakaoRoundIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  // 하단 링크
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },

  linkText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
  },

  // SNS section
  snsContainer: {
    marginTop: 50,
    paddingBottom: 14,
    alignItems: 'center',
  },
  snsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 25,
  },
  snsLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  snsTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '350',
  },
  snsIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
  },
  snsIconButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  snsIconImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  snsIconText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '800',
  },

});