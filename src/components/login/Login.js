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
            alert('환영합니다.');
            navigate('/');
        } catch (error) {
            console.error('로그인 실패', error);
            alert('로그인 실패: 사용자 ID 또는 비밀번호가 잘못되었습니다.');
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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
                    onKeyPress={handleKeyPress}
                />
                <LoginInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    onKeyPress={handleKeyPress}
                />
                <LoginButton type="button" onClick={handleLogin}>
                    로그인
                </LoginButton>
           
        </LoginContainer>
    );
};

export default Login;
