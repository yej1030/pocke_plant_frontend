// // 백엔드 연결 설정 (백엔드 준비되면 주석 풀기) 
// // import { Platform } from 'react-native';

// // const BASE_URL = Platform.select({
// //   android: 'http://10.0.2.2:8080',  // ← 백엔드 IP로 변경
// //   ios: 'http://localhost:8080',
// //   default: 'http://localhost:8080',
// // });

// // 공통 요청 함수 (백엔드 준비되면 주석 풀기)
// // async function request(path, options = {}) {
// //   const response = await fetch(`${BASE_URL}${path}`, {
// //     headers: {
// //       'Content-Type': 'application/json',
// //       ...(options.headers || {}),
// //     },
// //     ...options,
// //     body: options.body ? JSON.stringify(options.body) : undefined,
// //   });
// //
// //   const contentType = response.headers.get('content-type') || '';
// //   const payload = contentType.includes('application/json')
// //     ? await response.json()
// //     : await response.text();
// //
// //   if (!response.ok) {
// //     const message =
// //       payload?.message || payload?.error || '서버 요청에 실패했습니다.';
// //     throw new Error(message);
// //   }
// //
// //   return payload;
// // }

// // 백엔드 미연결 임시 함수 
// function backendNotReady() {
//   return Promise.resolve({ ok: true, message: null });
// }

// // 이메일 중복 확인
// export function checkEmailAvailability(email) {
//   // 백엔드 연결 시 아래 주석 풀고 backendNotReady 삭제
//   // return await request('/api/auth/email-check', { method: 'POST', body: { email } });
//   return backendNotReady(email);
// }

// // 회원가입
// export function signUpUser({ email, password, name }) {
//   // 백엔드 연결 시 아래 주석 풀고 backendNotReady 삭제
//   // return await request('/api/auth/signup', { method: 'POST', body: { email, password, name } });
//   return backendNotReady({ email, password, name });
// }

// // 로그인
// export function loginUser({ email, password }) {
//   // 백엔드 연결 시 아래 주석 풀고 backendNotReady 삭제
//   // return await request('/api/auth/login', { method: 'POST', body: { email, password } });
//   return backendNotReady({ email, password });
// }

// // export { BASE_URL };

