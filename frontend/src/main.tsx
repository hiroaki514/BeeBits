import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TimeLine from './TimeLine';

// ログイン状態を確認して振り分けるコンポーネント
const LoginRedirect = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // RailsのAPIを呼び出してログイン状態を確認
    fetch('http://localhost:3000/api/session', {
      credentials: 'include', // Cookieを送信
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.logged_in); // ログイン状態をセット
      });
  }, []);

  if (isLoggedIn === null) {
    return null; // ローディング中は空白を表示
  }

  // ログイン状態に応じて振り分け
  return isLoggedIn ? <Navigate to="/timelines" /> : <Navigate to="http://localhost:3000/users/sign_in" />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginRedirect />} /> {/* ログイン状態に応じて振り分け */}
        <Route path="/timelines" element={<TimeLine />} /> {/* タイムライン画面 */}
      </Routes>
    </Router>
  </StrictMode>
);
