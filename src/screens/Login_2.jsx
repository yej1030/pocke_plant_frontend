import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import Header from '../components/Header';
import styles from './style/Login_2.style';
// api 파일에 loginUser 함수가 있다고 가정합니다.
import { loginUser } from '../api/api'; 

export default function Login_2({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLogin = async () => {
    // 1. 필수 입력값 체크
    if (!email.trim()) {
      Alert.alert('안내', '이메일을 작성해 주세요.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('안내', '이메일 형식으로 써주세요.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('안내', '비밀번호를 작성해 주세요.');
      return;
    }

    // 2. 서버 연동 및 아이디/비번 일치 확인
    /*
    try {
      // 서버에 로그인 요청을 보냅니다.
      // const response = await loginUser({
      //   email: email.trim(),
      //   password: password,
      // });

      // 성공 시 (서버에서 성공 응답을 보냈을 때)
      // Alert.alert('안내', '로그인에 성공했습니다!', [
      //   {
      //     text: '확인',
      //     onPress: () => navigation.replace('Main'), // 메인 화면으로 이동
      //   },
      // ]);
    } catch (error) {
      // 실패 시 (아이디/비번 불일치 또는 서버 오류)
      // 서버에서 "아이디 또는 비밀번호가 일치하지 않습니다"라는 에러 메시지를 보낸다고 가정합니다.
      // Alert.alert('로그인 실패', error.message || '아이디 또는 비밀번호를 확인해주세요.');
    }
    */
    // 서버 없이 바로 메인으로 이동 (Alert로 안내 후 이동)
    Alert.alert('안내', '로그인에 성공했습니다!', [
      {
        text: '확인',
        onPress: () => navigation.replace('Main'),
      },
    ]);
  };

  return (
    <>
      <Header title="로그인" navigation={navigation} type="auth" />
      <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="아이디 (이메일)"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginSubmitButton} onPress={handleLogin}>
          <Text style={styles.loginSubmitText}>로그인하기</Text>
        </TouchableOpacity>

          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
      </View>
</>
  );
}