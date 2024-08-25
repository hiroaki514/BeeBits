import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TimeLine from './TimeLine.tsx';
import Profile from './Profile.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/timelines" />} />
        <Route path="/timelines" element={<TimeLine />} />
        <Route path="/profiles/:userId" element={<Profile />} />
      </Routes>
    </Router>
  </StrictMode>,
);
