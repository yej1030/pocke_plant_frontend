import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL =
  'http://192.168.0.211:8080';

const getToken = async () =>
  AsyncStorage.getItem('serviceToken');

const getAuthHeaders = async () => {
  const token = await getToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

const getImageInfo = (
  imageUri,
  prefix = 'image',
) => {
  const cleanUri =
    imageUri.split('?')[0];

  const name =
    cleanUri.split('/').pop() ||
    `${prefix}-${Date.now()}.jpg`;

  const lowerName =
    name.toLowerCase();

  let type = 'image/jpeg';

  if (lowerName.endsWith('.png')) {
    type = 'image/png';
  } else if (
    lowerName.endsWith('.webp')
  ) {
    type = 'image/webp';
  }

  return {
    uri: imageUri,
    name,
    type,
  };
};

// 일반 로그인
export const loginUser =
  async data => {
    const response =
      await axios.post(
        `${BASE_URL}/api/email/login`,
        data,
      );

    return response.data;
  };

// 회원가입
export const signUpUser =
  async data => {
    const response =
      await axios.post(
        `${BASE_URL}/api/email/register`,
        data,
      );

    return response.data;
  };

// 이메일 인증번호 요청
export const sendEmailCode =
  async email => {
    const response =
      await axios.post(
        `${BASE_URL}/api/email/verify-request`,
        null,
        {
          params: { email },
        },
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
        },
      );

    return response.data;
  };

// 카카오 로그인
export const kakaoLoginApi =
  async accessToken => {
    const response =
      await axios.post(
        `${BASE_URL}/kakao/login/token`,
        {
          accessToken,
        },
      );

    return response.data;
  };

// 내 정보 조회
export const getMyInfo =
  async token => {
    const response =
      await axios.get(
        `${BASE_URL}/api/user/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

    return response.data;
  };

// 식물 등록
export const registerPlant =
  async plantData => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.post(
        `${BASE_URL}/api/plants/register`,
        plantData,
        { headers },
      );

    return response.data;
  };

// 내 식물 목록
export const getMyPlants =
  async () => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.get(
        `${BASE_URL}/api/plants/my`,
        { headers },
      );

    return response.data;
  };

// 식물 북마크
export const toggleBookmarkApi =
  async plantId => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.patch(
        `${BASE_URL}/api/plants/${plantId}/bookmark`,
        {},
        { headers },
      );

    return response.data;
  };

// 식물 수정
export const updatePlantApi =
  async (
    plantId,
    plantData,
  ) => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.put(
        `${BASE_URL}/api/plants/edit/${plantId}`,
        plantData,
        { headers },
      );

    return response.data;
  };

// 식물 삭제
export const deletePlantApi =
  async plantId => {
    const headers =
      await getAuthHeaders();

    await axios.delete(
      `${BASE_URL}/api/plants/edit/${plantId}`,
      { headers },
    );
  };

// 식물 종 분석
export const identifyPlantApi =
  async imageUri => {
    const headers =
      await getAuthHeaders();

    const formData =
      new FormData();

    formData.append(
      'image',
      getImageInfo(
        imageUri,
        'plant',
      ),
    );

    const response =
      await axios.post(
        `${BASE_URL}/api/plants/identify`,
        formData,
        {
          headers: {
            ...headers,
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

    return response.data;
  };

// 공용 이미지 업로드
export const uploadImageApi =
  async imageUri => {
    if (!imageUri) {
      return null;
    }

    if (
      imageUri.startsWith('http://') ||
      imageUri.startsWith('https://')
    ) {
      return imageUri;
    }

    const headers =
      await getAuthHeaders();

    const formData =
      new FormData();

    formData.append(
      'image',
      getImageInfo(
        imageUri,
        'upload',
      ),
    );

    const response =
      await axios.post(
        `${BASE_URL}/api/uploads/images`,
        formData,
        {
          headers: {
            ...headers,
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

    return response.data.imageUri;
  };

// AI 채팅방 생성
export const createAiChatRoom =
  async plantId => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.post(
        `${BASE_URL}/api/ai-chat/room`,
        {
          plantId,
        },
        { headers },
      );

    return response.data;
  };

// AI 메시지 전송
export const sendAiMessage =
  async (
    roomId,
    message,
  ) => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.post(
        `${BASE_URL}/api/ai-chat/send-message`,
        {
          roomId,
          message,
        },
        { headers },
      );

    return response.data;
  };

// 최신 센서 데이터
export const getLatestSensorData =
  async macAddress => {
    if (!macAddress) {
      throw new Error(
        'macAddress가 없어 센서 데이터를 조회할 수 없습니다.',
      );
    }

    const headers =
      await getAuthHeaders();

    const response =
      await axios.get(
        `${BASE_URL}/api/sensor/latest/${macAddress}`,
        { headers },
      );

    return response.data;
  };

// 센서 전체 이력
export const getSensorHistory =
  async macAddress => {
    if (!macAddress) {
      throw new Error(
        'macAddress가 없어 센서 이력을 조회할 수 없습니다.',
      );
    }

    const headers =
      await getAuthHeaders();

    const response =
      await axios.get(
        `${BASE_URL}/api/sensor/history/${macAddress}`,
        { headers },
      );

    return response.data;
  };

// 식물 환경 정보
export const getPlantEnv =
  async plantName => {
    const response =
      await axios.get(
        `${BASE_URL}/api/plant/env`,
        {
          params: {
            name: plantName,
          },
        },
      );

    return response.data;
  };

// 게시글 목록
export const getBoardsApi =
  async () => {
    const response =
      await axios.get(
        `${BASE_URL}/api/boards`,
      );

    return response.data;
  };

// 게시글 상세
export const getBoardApi =
  async postId => {
    const response =
      await axios.get(
        `${BASE_URL}/api/boards/${postId}`,
      );

    return response.data;
  };

// 게시글 작성
export const createBoardApi =
  async postData => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.post(
        `${BASE_URL}/api/boards`,
        {
          title: postData.title,
          content: postData.content,
          category: postData.category,
          imageUris:
            postData.imageUris || [],
        },
        { headers },
      );

    return response.data;
  };

// 게시글 수정
export const updateBoardApi =
  async (
    postId,
    postData,
  ) => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.put(
        `${BASE_URL}/api/boards/${postId}`,
        {
          title: postData.title,
          content: postData.content,
          category: postData.category,
          imageUris:
            postData.imageUris || [],
        },
        { headers },
      );

    return response.data;
  };

// 게시글 삭제
export const deleteBoardApi =
  async postId => {
    const headers =
      await getAuthHeaders();

    await axios.delete(
      `${BASE_URL}/api/boards/${postId}`,
      { headers },
    );
  };

// 게시글 댓글 조회
export const getCommentsApi =
  async postId => {
    const response =
      await axios.get(
        `${BASE_URL}/api/comments/board/${postId}`,
      );

    return response.data;
  };

// 댓글·답글 작성
export const createCommentApi =
  async ({
    postId,
    parentId = null,
    content,
  }) => {
    const headers =
      await getAuthHeaders();

    const response =
      await axios.post(
        `${BASE_URL}/api/comments`,
        {
          boardId:
            Number(postId),
          parentId:
            parentId
              ? Number(parentId)
              : null,
          content,
        },
        { headers },
      );

    return response.data;
  };

// 댓글 삭제
export const deleteCommentApi =
  async commentId => {
    const headers =
      await getAuthHeaders();

    await axios.delete(
      `${BASE_URL}/api/comments/${commentId}`,
      { headers },
    );
  };

// 질병 진단
export const predictDiseaseApi =
  async imageUri => {
    if (!imageUri) {
      throw new Error(
        '질병 진단 이미지가 없습니다.',
      );
    }

    const headers =
      await getAuthHeaders();

    const formData =
      new FormData();

    formData.append(
      'image',
      getImageInfo(
        imageUri,
        'disease',
      ),
    );

    const response =
      await axios.post(
        `${BASE_URL}/api/disease/predict`,
        formData,
        {
          headers: {
            ...headers,
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

    return response.data;
  };