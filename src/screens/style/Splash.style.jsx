import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 로고 이미지
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  // 앱 이름
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 70,
    color: '#333',
  },

});