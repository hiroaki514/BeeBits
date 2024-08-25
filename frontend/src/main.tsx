import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TimeLine from './TimeLine.tsx';
import Profile from './Profile.tsx';
import ProfileEdit from './ProfileEdit.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/timelines" />} />
        <Route path="/timelines" element={<TimeLine />} />
        <Route path="/profiles/:userId" element={<Profile />} />
        <Route path="/profiles/:userId/edit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  </StrictMode>,
);
