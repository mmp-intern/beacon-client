import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../cookie';

const PrivateRoute = ({ roles }) => {
    const user = JSON.parse(getCookie('user'));

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
