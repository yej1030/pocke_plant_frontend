import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style/Login_1.style';

export default function Login_1({ navigation }) {

  // 화면
  return (
    <View style={styles.container}>

      {/* 앱 이름 */}
      <Text style={styles.title}>Pocket Plants</Text>

      {/* 로고 이미지 */}
      <Image
        source={require('../assets/logo_2.png')}
        style={styles.image}
      />

      {/* 버튼 그룹 */}
      <View style={styles.buttonGroup}>

        {/* 신규 회원가입 버튼 */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>신규 회원가입</Text>
        </TouchableOpacity>

        {/* 기존 유저 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>기존 유저 로그인</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}