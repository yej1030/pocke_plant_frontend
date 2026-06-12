import React, {
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  Animated,
} from 'react-native';

import AsyncStorage
  from '@react-native-async-storage/async-storage';

import {
  getMyInfo,
} from '../api/api';

import styles
  from './style/Splash.style';

export default function SplashScreen({
  navigation,
} = {}) {

  const scaleAnim =
    useRef(
      new Animated.Value(0.5)
    ).current;

  useEffect(() => {

    Animated.spring(
      scaleAnim,
      {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }
    ).start();

    checkAutoLogin();

  }, []);

  const checkAutoLogin =
    async () => {

      try {

        const token =
          await AsyncStorage.getItem(
            'serviceToken'
          );

        console.log(
          '저장된 토큰:',
          token
        );

        if (!token) {

          setTimeout(() => {

            navigation.replace(
              'Login_1'
            );

          }, 3000);

          return;
        }

        await getMyInfo(token);

        console.log(
          '자동로그인 성공'
        );

        setTimeout(() => {

          navigation.replace(
            'Main'
          );

        }, 3000);

      } catch (error) {

        console.log(
          '자동로그인 실패:',
          error.response?.data
        );

        await AsyncStorage.removeItem(
          'serviceToken'
        );

        setTimeout(() => {

          navigation.replace(
            'Login_1'
          );

        }, 3000);
      }
    };

  return (
    <View style={styles.container}>

      <Animated.Image
        source={
          require('../assets/logo/logo.png')
        }
        style={[
          styles.image,
          {
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          },
        ]}
      />

      <Text style={styles.title}>
        Pocket Plants
      </Text>

    </View>
  );
}