import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../cookie';
import {
    LoginContainer,
    LoginTitle,
    LoginForm,
    LoginInput,
    LoginButton
} from './LoginStyles';
import apiClient from '../../apiClient';


const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    console.log("Login component rendered");

    const handleLogin = async () => {
        try {
            const response = await apiClient.post('/login', {
                userId,
                password,
            });

            console.log('Response:', response.data);

            if (response.data && response.data.accessToken) {
                setCookie('accessToken', response.data.accessToken, { path: '/' });
                console.log(response.data.accessToken);
                setCookie('refreshToken', response.data.refreshToken, { path: '/' });
                console.log(response.data.refreshToken);
                alert('로그인 성공');
                navigate('/'); // 로그인 성공 후 대시보드 페이지로 리다이렉트
            } else {
                alert('로그인 실패: 토큰이 반환되지 않았습니다.');
            }
        } catch (error) {
            console.error('로그인 실패', error);
            alert('로그인 실패: 사용자 ID 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <LoginContainer>
            <LoginTitle>엄김조</LoginTitle>
            <LoginForm>
                <LoginInput
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디"
                />
                <LoginInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <LoginButton type="button" onClick={handleLogin}>
                    로그인
                </LoginButton>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;
