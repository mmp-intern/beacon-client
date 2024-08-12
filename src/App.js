import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthProvider from './AuthContext';
import DailyStatus from './pages/commute/DailyStatus';
import CommuteStatistics from './pages/commute/CommuteStatistics';
import LoginPage from './pages/loginform/LoginPage';
import CreateAdmin from './pages/createadmin/CreateAdmin';
import CreateUser from './pages/createuser/CreateUser';
import UserProfile from './pages/profile/UserProfile';
import MyProfile from './pages/profile/MyProfile';

const PrivateRoute = ({ children, roles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <DailyStatus />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/commute-week"
                        element={
                            <PrivateRoute>
                                <CommuteStatistics period="week" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/commute-month"
                        element={
                            <PrivateRoute>
                                <CommuteStatistics period="month" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/commute-year"
                        element={
                            <PrivateRoute>
                                <CommuteStatistics period="year" />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/:userId"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/me"
                        element={
                            <PrivateRoute roles={['USER']}>
                                <MyProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute roles={['SUPER_ADMIN']}>
                                <CreateAdmin />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute roles={['SUPER_ADMIN', 'ADMIN']}>
                                <CreateUser />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
