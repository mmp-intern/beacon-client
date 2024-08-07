import React, { createContext, useState, useContext } from 'react';
import apiClient from './apiClient';
import { getCookie, setCookie, removeCookie } from './cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = getCookie('access_token');
        if (token) {
            return JSON.parse(atob(token.split('.')[1])).user;
        }
        return null;
    });

    const login = async (credentials) => {
        const response = await apiClient.post('/login', credentials);
        const { accessToken, refreshToken, user } = response.data;
        setUser(user);
        saveTokens(accessToken, refreshToken);
    };

    const logout = () => {
        setUser(null);
        removeCookie('access_token');
        removeCookie('refresh_token');
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const saveTokens = (accessToken, refreshToken) => {
    setCookie('access_token', accessToken, { path: '/' });
    setCookie('refresh_token', refreshToken, { path: '/' });
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
