import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/timelines" />} />
        <Route path="/timelines" element={<TimeLine />} />
      </Routes>
    </Router>
  </StrictMode>,
);
