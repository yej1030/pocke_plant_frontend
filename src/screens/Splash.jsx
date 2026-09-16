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
	clearAuthSession,
	syncAuthProfile,
} from '../auth/authStorage';

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

	const floatAnim =
		useRef(
			new Animated.Value(0)
		).current;

	useEffect(() => {
		let active = true;
		let navigationTimer;

		const spring = Animated.spring(
			scaleAnim,
			{
				toValue: 1,
				friction: 3,
				tension: 40,
				useNativeDriver: true,
			}
		);

		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(
					floatAnim,
					{
						toValue: -8,
						duration: 1500,
						useNativeDriver: true,
					}
				),
				Animated.timing(
					floatAnim,
					{
						toValue: 0,
						duration: 1500,
						useNativeDriver: true,
					}
				),
			])
		);

		const navigateAfterSplash = screenName => {
			navigationTimer = setTimeout(() => {
				if (active) navigation.replace(screenName);
			}, 3000);
		};

		const checkAutoLogin = async () => {
			try {
				const token = await AsyncStorage.getItem('serviceToken');
				if (!token) {
					navigateAfterSplash('Login_1');
					return;
				}

				const userInfo = await getMyInfo(token);
				await syncAuthProfile(userInfo);
				navigateAfterSplash('Main');
			} catch (error) {
				console.log('자동로그인 실패:', error.response?.data);
				await clearAuthSession();
				navigateAfterSplash('Login_1');
			}
		};

		spring.start();
		loop.start();
		checkAutoLogin();

		return () => {
			active = false;
			if (navigationTimer) clearTimeout(navigationTimer);
			spring.stop();
			loop.stop();
		};
	}, [floatAnim, navigation, scaleAnim]);

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
							{
								translateY: floatAnim,
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
