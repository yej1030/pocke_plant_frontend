import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './style/ResetPassword.style';
import Header from '../components/Header';

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <>
      <Header title="비밀번호 찾기" navigation={navigation} type="auth" />
      <View style={styles.container}>

          {/* 비밀번호 입력창 */}
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* 새 비밀번호 입력창 */}
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            placeholderTextColor="#aaa"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          {/* 비밀번호 변경 버튼 */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => {
              console.log('비밀번호 변경 시도');
              navigation.navigate('Login_2'); // 변경 후 로그인 화면으로 이동
            }}
          >
            <Text style={styles.submitButtonText}>비밀번호 변경</Text>
          </TouchableOpacity>

          {/* 하단 회원가입 링크 */}
          <View style={styles.footerLink}>
            <TouchableOpacity onPress={() => navigation.navigate('Login_2')}>
              <Text style={styles.linkText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
    </>
  );
}