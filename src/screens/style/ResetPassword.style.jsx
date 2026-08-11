import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1F2937',
  },

// 비밀번호 입력 행
passwordRow: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 4,
  marginBottom: 10,
  paddingHorizontal: 15,
  height: 52,
},

  // 비밀번호 입력창
passwordInput: {
  flex: 1,
  fontSize: 15,
  color: '#1F2937',
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
    color: '#9CA3AF',
    marginBottom: 10,
  },

  // 에러 텍스트
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginBottom: 10,
  },

  submitButton: {
    backgroundColor: '#7FC77C',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  footerLink: {
    marginTop: 8,
    alignItems: 'center',
  },

  linkText: {
    fontSize: 12,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },

});