
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
     borderColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 15,
     color: '#1F2937',
  },
  submitButton: {
     backgroundColor: '#7FC77C',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  submitButtonText: {
     color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footerLink: {
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  linkText: {
    fontSize: 12,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});