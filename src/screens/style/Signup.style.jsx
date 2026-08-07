import { StyleSheet } from 'react-native';


export default StyleSheet.create({

  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // 섹션 제목
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  // 이메일 입력 + 인증 버튼 행
inputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#e1e1e1',
  borderRadius: 4,
  marginBottom: 10,
  paddingHorizontal: 15,
  height: 52,
},

  // 이메일 입력창
inputFlex: {
  flex: 1,
  fontSize: 15,
  color: '#333',
},

  // 인증 버튼
certButton: {
  minWidth: 72,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
},
certText: {
  fontSize: 15,
  fontWeight: '600',
  color: '#7fc77c',
  right: -10,
},

  // 인증 메시지
  certMessage: {
    fontSize: 12,
    color: '#7fc77c',
    marginBottom: 10,
    marginTop: -2,
    paddingLeft: 2,
  },

  // 일반 입력창
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

  // 비밀번호 입력 행
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

  // 비밀번호 입력창
passwordInput: {
  flex: 1,
  fontSize: 15,
  color: '#333',
},

  // 비밀번호 보기 버튼
  eyeButton: {
    paddingLeft: 10,
  },
eyeIcon: {
  width: 20,
  height: 20,
},

  // 힌트 텍스트
  hint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },

  // 에러 텍스트
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },

  // 회원가입 버튼
  submitButton: {
    backgroundColor: '#7fc77c',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

});