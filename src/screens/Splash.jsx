import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './style/Splash.style';

export default function SplashScreen({ navigation } = {}) {

  // 애니메이션
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // 로고 애니메이션
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // 3초 후 로그인 화면으로 이동
    setTimeout(() => {
      if (navigation?.replace) {
        navigation.replace('Login_1');
      }
    }, 3000);
  }, [navigation, scaleAnim]);

  // 화면
  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
      />
      {/* 앱 이름 */}
      <Text style={styles.title}>Pocket Plants</Text>
    </View>
  );
}