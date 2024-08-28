// apiClient.js
import axios from 'axios';
import API_BASE_URL from './config'; // 기본 내보내기에서 불러오기
import { getCookie, setCookie, removeCookie } from './cookie'; // cookies.js 파일에서 불러옴

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: API_BASE_URL, // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json', // 기본 헤더 설정
    },
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = getCookie('access_token'); // access_token 쿠키에서 토큰을 가져옴
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더에 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 요청 에러 처리
    }
);


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            const { status } = error.response;

            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = getCookie('refresh_token');
                    if (!refreshToken) {
                        console.error('No refresh token available');
                        redirectToLogin();
                        return Promise.reject(new Error('No refresh token available'));
                    }

                    // 새 토큰 요청
                    const tokenResponse = await axios.post(
                        `${API_BASE_URL}/refresh`,
                        {}, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${refreshToken}`
                            },
                        }
                    );

                    const { accessToken } = tokenResponse.data;

                    if (!accessToken) {
                        redirectToLogin();
                        return Promise.reject(new Error('Failed to refresh token, redirecting to login.'));
                    }

                    // 새 액세스 토큰 저장
                    saveTokens(accessToken, refreshToken);

                    // 원래 요청에 새 토큰 추가
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiClient(originalRequest); // 원래 요청을 다시 시도
                } catch (tokenRefreshError) {
                    console.error('Failed to refresh token', tokenRefreshError);
                    redirectToLogin();
                    return Promise.reject(tokenRefreshError);
                }
            }
        } else {
            console.error('Error response is undefined', error);
        }

        return Promise.reject(error);
    }
);

// 새 토큰을 저장하는 함수
function saveTokens(accessToken, refreshToken) {
    setCookie('access_token', accessToken, { path: '/' }); // access_token을 쿠키에 저장
    setCookie('refresh_token', refreshToken, { path: '/' }); // refresh_token을 쿠키에 저장
}

// 로그인 페이지로 리디렉션하는 함수
function redirectToLogin() {
    removeCookie('access_token'); // access_token 쿠키 삭제
    removeCookie('refresh_token'); // refresh_token 쿠키 삭제
    window.location.href = '/login'; // 로그인 페이지로 이동
}

export default apiClient; // apiClient 인스턴스를 모듈의 기본값으로 내보냄
