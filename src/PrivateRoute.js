/*// src/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from './cookie'; // 쿠키에서 토큰을 가져오는 유틸 함수

const PrivateRoute = ({ element }) => {
    const token = getCookie('accessToken'); // 쿠키에서 토큰을 가져옴
    const location = useLocation(); // 현재 위치를 가져옴

    if (!token) {
        // 인증되지 않은 경우 로그인 페이지로 리디렉션
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // 인증된 경우 요청된 컴포넌트를 렌더링
    return element;
};

export default PrivateRoute;
*/