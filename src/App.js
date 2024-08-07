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

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/commute" element={<Commute />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/commute-records" element={<CommuteRecords />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/mypage" element={<MyProfile />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<CreateAdmin />} />
                <Route path="/users" element={<CreateUser />} />
            </Routes>
        </Router>
    );
};

export default App;  