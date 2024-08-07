import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Commute from './pages/commute/Commute';
import Statistics from './pages/commuteStatistics/Statistics';
import CommuteRecords from './pages/commute/CommuteRecords';
import LoginPage from './pages/loginform/LoginPage';
import CreateAdmin from './pages/createadmin/CreateAdmin';
import CreateUser from './pages/createuser/CreateUser';
import UserProfile from './pages/profile/UserProfile';
import MyProfile from './pages/profile/MyProfile';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/commute" element={<Commute />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/commute-records" element={<CommuteRecords />} />
                        <Route path="/profile/:userId" element={<UserProfile />} />
                    </Route>
                    <Route element={<PrivateRoute roles={['employee']} />}>
                        <Route path="/mypage" element={<MyProfile />} />
                    </Route>
                    <Route element={<PrivateRoute roles={['superadmin']} />}>
                        <Route path="/admin" element={<CreateAdmin />} />
                    </Route>
                    <Route element={<PrivateRoute roles={['superadmin', 'admin']} />}>
                        <Route path="/users" element={<CreateUser />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
