import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TimeLine from './TimeLine';

const Home = () => {
  return <h1>Welcome to Home Page</h1>; // シンプルなホームコンポーネント
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ルート画面の設定 */}
        <Route path="/timelines" element={<TimeLine />} /> {/* 既存のタイムライン */}
      </Routes>
    </Router>
  </StrictMode>,
);
