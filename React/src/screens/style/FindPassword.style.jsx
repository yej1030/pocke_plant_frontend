
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
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
  submitButton: {
    backgroundColor: '#5CD79E',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerLink: {
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  linkText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
  },
});