import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 백엔드 서버 주소
const BASE_URL =
  'http://172.16.114.163:8080';

// 일반 로그인 API
export const loginUser =
  async (data) => {

    const response =
      await axios.post(
        `${BASE_URL}/api/email/login`,
        data
      );

    return response.data;
  };

// 회원가입 API
export const signUpUser =
  async (data) => {

    const response =
      await axios.post(
        `${BASE_URL}/api/email/register`,
        data
      );

    return response.data;
  };

// 이메일 인증번호 요청
export const sendEmailCode =
  async (email) => {

    const response =
      await axios.post(
        `${BASE_URL}/api/email/verify-request`,
        null,
        {
          params: {
            email,
          },
        }
      );

    return response.data;
  };

// 이메일 인증번호 확인
export const verifyEmailCode =
  async (email, code) => {

    const response =
      await axios.post(
        `${BASE_URL}/api/email/verify-code`,
        null,
        {
          params: {
            email,
            code,
          },
        }
      );

    return response.data;
  };

// 카카오 로그인 API
export const kakaoLoginApi =
  async (accessToken) => {

    const response =
      await axios.post(
        `${BASE_URL}/kakao/login/token`,
        {
          accessToken,
        }
      );

    return response.data;
  };

  // 내 정보 조회 (자동 로그인 검증)
export const getMyInfo =
  async (token) => {

    const response =
      await axios.get(
        `${BASE_URL}/api/user/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  // 식물 등록
  export const registerPlant =
  async (plantData) => {

    const token =
      await AsyncStorage.getItem(
        'serviceToken'
      );

    const response =
      await axios.post(
        `${BASE_URL}/api/plants/register`,
        plantData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  //식물 정보 가져오기
  export const getMyPlants =
  async () => {

    const token =
      await AsyncStorage.getItem(
        'serviceToken'
      );

    const response =
      await axios.get(
        `${BASE_URL}/api/plants/my`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  //북마크
  export const toggleBookmarkApi =
  async (plantId) => {

    const token =
      await AsyncStorage.getItem(
        'serviceToken'
      );

    const response =
      await axios.patch(
        `${BASE_URL}/api/plants/${plantId}/bookmark`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

