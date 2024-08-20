import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthProvider from './AuthContext';
import DailyStatus from './pages/commute/DailyStatus';
import CommuteWeeklyStats from './pages/commute/CommuteWeeklyStats';
import CommuteMonthlyStats from './pages/commute/CommuteMonthlyStats';
import CommuteYearlyStats from './pages/commute/CommuteYearlyStats';
import LoginPage from './pages/loginform/LoginPage';
import CreateAdmin from './pages/createadmin/CreateAdmin';
import CreateUser from './pages/createuser/CreateUser';
import UserProfile from './pages/profile/UserProfile';
import MyProfile from './pages/profile/MyProfile';
import UserList from './pages/userlist/UserList';
import Beacon from './pages/beacon/Beacon';
import BeaconRegister from './pages/beacon/BeaconRegister';
import BeaconEdit from './pages/beacon/BeaconEdit';
import CommuteDetail from './pages/commute/CommuteDetail';

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
                        path="/commute/:recordId"
                        element={
                            <PrivateRoute>
                                <CommuteDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/commute-week"
                        element={
                            <PrivateRoute>
                                <CommuteWeeklyStats />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/commute-month"
                        element={
                            <PrivateRoute>
                                <CommuteMonthlyStats />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/commute-year"
                        element={
                            <PrivateRoute>
                                <CommuteYearlyStats />
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
                            <PrivateRoute>
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
                    <Route
                        path="/userlist"
                        element={
                            <PrivateRoute roles={['SUPER_ADMIN', 'ADMIN']}>
                                <UserList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/beacon"
                        element={
                            <PrivateRoute roles={['SUPER_ADMIN', 'ADMIN']}>
                                <Beacon />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/registerBeacon"
                        element={
                            <PrivateRoute roles={['SUPER_ADMIN', 'ADMIN']}>
                                <BeaconRegister />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/editbeacon"
                        element={
                            <PrivateRoute roles={['SUPER_ADMIN', 'ADMIN']}>
                                <BeaconEdit />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
