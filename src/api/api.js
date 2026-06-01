import axios from 'axios';

// 백엔드 서버 주소
const BASE_URL =
  'http://10.0.2.2:8080';

// 일반 로그인 API
export const loginUser =
  async (data) => {

    const response =
      await axios.post(
        `${BASE_URL}/login`,
        data
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