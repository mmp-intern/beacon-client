// apiClient.js
import axios from 'axios';
import API_BASE_URL from './config'; // 기본 내보내기에서 불러오기
import { getCookie, setCookie, removeCookie } from './cookie'; // cookies.js 파일에서 불러옴

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token"); // access_token 쿠키에서 토큰을 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 에러 처리
  }
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => response, // 응답이 성공적일 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    if (error.response) { // 에러 응답이 있을 경우
      const { status, data } = error.response;

      // 토큰 만료 처리
      if (status === 401 && !originalRequest._retry && data.msg === "Expired Access Token. 토큰이 만료되었습니다") {
        originalRequest._retry = true; // 요청이 재시도되는 것을 방지하기 위해 플래그 설정

        try {
          const refreshToken = getCookie("refresh_token"); // refresh_token 쿠키에서 가져옴
          if (!refreshToken) {
            console.error("No refresh token available");
            redirectToLogin(); // refresh_token이 없으면 로그인 페이지로 리디렉션
            return Promise.reject(new Error("No refresh token available"));
          }

          // 새 토큰 요청 ,   url 확인
          const tokenResponse = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`, // refresh_token을 헤더에 추가
              },
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = tokenResponse.data;

          // 새 토큰 저장
          saveTokens(accessToken, newRefreshToken);

          // 원래 요청에 새 토큰 추가
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest); // 원래 요청을 다시 시도
        } catch (tokenRefreshError) {
          console.error("Failed to refresh token", tokenRefreshError);
          redirectToLogin(); // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
          return Promise.reject(tokenRefreshError);
        }
      }
    } else {
      console.error("Error response is undefined", error); // 에러 응답이 없는 경우 로그 출력
    }

    return Promise.reject(error); // 에러를 그대로 반환
  }
);

// 새 토큰을 저장하는 함수
function saveTokens(accessToken, refreshToken) {
  setCookie("access_token", accessToken, { path: "/" }); // access_token을 쿠키에 저장
  setCookie("refresh_token", refreshToken, { path: "/" }); // refresh_token을 쿠키에 저장
}

// 로그인 페이지로 리디렉션하는 함수
function redirectToLogin() {
  removeCookie("access_token"); // access_token 쿠키 삭제
  removeCookie("refresh_token"); // refresh_token 쿠키 삭제
  window.location.href = "/login"; // 로그인 페이지로 이동
}

export default apiClient; // apiClient 인스턴스를 모듈의 기본값으로 내보냄
