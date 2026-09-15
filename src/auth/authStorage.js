import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_STORAGE_KEYS = [
  'serviceToken',
  'userId',
  'nickname',
  'email',
  'profileImageUrl',
  'kakaoId',
  'naverId',
  'loginType',
];

const valueEntry = (key, value) =>
  value === null || value === undefined
    ? null
    : [key, String(value)];

const authPayload = response => {
  if (response?.data?.serviceToken) return response.data;
  if (response?.serviceToken) return response;
  return null;
};

export const clearAuthSession = async () => {
  await AsyncStorage.multiRemove(AUTH_STORAGE_KEYS);
};

export const saveAuthSession = async response => {
  const payload = authPayload(response);
  if (!payload?.serviceToken) {
    throw new Error('서버에서 로그인 토큰을 받지 못했습니다.');
  }

  const entries = [
    valueEntry('serviceToken', payload.serviceToken),
    valueEntry('userId', payload.userId),
    valueEntry('nickname', payload.nickname),
    valueEntry('email', payload.email),
    valueEntry('profileImageUrl', payload.profileImageUrl),
    valueEntry('kakaoId', payload.kakaoId),
    valueEntry('naverId', payload.naverId),
    valueEntry('loginType', payload.loginType),
  ].filter(Boolean);

  // Remove every value from the previous account before storing the new one.
  await clearAuthSession();
  await AsyncStorage.multiSet(entries);
  return payload;
};

export const syncAuthProfile = async profile => {
  if (!profile?.id) return;

  const entries = [
    valueEntry('userId', profile.id),
    valueEntry('nickname', profile.nickname ?? profile.username),
    valueEntry('email', profile.email),
    valueEntry('profileImageUrl', profile.profileImage),
    valueEntry('kakaoId', profile.kakaoId),
    valueEntry('naverId', profile.naverId),
    valueEntry('loginType', profile.loginType),
  ].filter(Boolean);

  const profileKeys = AUTH_STORAGE_KEYS.filter(key => key !== 'serviceToken');
  await AsyncStorage.multiRemove(profileKeys);
  await AsyncStorage.multiSet(entries);
};
