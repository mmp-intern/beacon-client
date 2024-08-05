import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Commute from './pages/commute/Commute';
import Statistics from './pages/commuteStatistics/Statistics';
import CommuteRecords from './pages/commute/CommuteRecords';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/commute" element={<Commute />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/commute-records" element={<CommuteRecords />} />
            </Routes>
        </Router>
    );
};

export default App;
