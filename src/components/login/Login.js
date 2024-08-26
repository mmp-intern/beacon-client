import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { LoginContainer, LoginTitle, LoginInput, LoginButton } from './LoginStyles';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login({ userId, password });
            alert('로그인 성공');
            navigate('/');
        } catch (error) {
            console.error('로그인 실패', error);
            alert('로그인 실패: 사용자 ID 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <LoginContainer>
            <LoginTitle>MKM</LoginTitle>
           
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
           
        </LoginContainer>
    );
};

export default Login;
