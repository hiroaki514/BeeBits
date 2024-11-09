import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TimeLine from './TimeLine';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/timelines" element={<TimeLine />} />
      </Routes>
    </Router>
  </StrictMode>,
);
