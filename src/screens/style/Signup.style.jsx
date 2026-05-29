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
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  // 이메일 입력 + 인증 버튼 행
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  // 이메일 입력창
  inputFlex: {
    flex: 1,
    paddingVertical: 14,
  },

  // 인증 버튼
  certButton: {
    paddingHorizontal: 10,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certText: {
    color: '#5CD79E',
    fontWeight: 'bold',
  },

  // 인증 메시지
  certMessage: {
    fontSize: 12,
    color: '#5CD79E',
    marginBottom: 10,
    marginTop: -2,
    paddingLeft: 2,
  },

  // 일반 입력창
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 14,
    marginBottom: 10,
  },

  // 비밀번호 입력 행
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 14,
    paddingRight: 8,
  },

  // 비밀번호 입력창
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 10,
  },

  // 비밀번호 보기 버튼
  eyeButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  eyeText: {
    fontSize: 18,
  },

  // 힌트 텍스트
  hint: {
    fontSize: 12,
    color: '#999',
    marginLeft: 7,
    marginTop: -8,
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
    backgroundColor: '#5CD79E',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});