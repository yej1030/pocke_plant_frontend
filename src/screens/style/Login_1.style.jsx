import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // 배경
  background: {
    flex: 1,
  },

  // 전체 컨테이너
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 88,
    paddingBottom: 34,
    paddingHorizontal: 20,
  },

  // 앱 이름
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
  },

  // 로고 이미지
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    marginTop: -75,
    alignSelf: 'center',
    zIndex: 2,
  },

  // 버튼 그룹
  buttonGroup: {
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 'auto',
    marginBottom: 30,
  },

  // 카카오 로그인 버튼
  kakaoButton: {
    width: '100%',
    backgroundColor: '#FEE500',
    paddingVertical: 13,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  kakaoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  kakaoText: {
    fontSize: 17,
    color: '#381E1F',
    fontWeight: '700',
  },

  // 신규 회원가입 버튼
  signupButton: {
    width: '100%',
    backgroundColor: '#7fc77c',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  signupText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },

  // 기존 유저 로그인 버튼
  loginButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 13,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d7d7d7',
  },
  loginText: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600',
  },

});