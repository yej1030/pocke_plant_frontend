import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
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
  // 눈 아이콘
eyeIcon: {
  width: 20,
  height: 20,
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

  submitButton: {
    backgroundColor: '#5CD79E',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  footerLink: {
    alignItems: 'center',
    marginTop: 12,
  },

  linkText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
  },

});