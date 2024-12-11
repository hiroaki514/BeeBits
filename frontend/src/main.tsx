import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TimeLine from './TimeLine';

// ログイン状態を確認してリダイレクト処理を行うコンポーネント
const LoginRedirect = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // RailsのAPIを呼び出してログイン状態を確認
    fetch('http://localhost:3000/api/session', {
      credentials: 'include', // Cookieを送信するための設定
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.logged_in); // ログイン状態をセット
      });
  }, []);

  if (isLoggedIn === null) {
    return null; // ローディング中は何も表示しない
  }

  // ログイン済みの場合はタイムラインを表示、未ログインの場合はログイン画面にリダイレクト
  return isLoggedIn ? <TimeLine /> : <Navigate to="http://localhost:3000/users/sign_in" />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginRedirect />} /> {/* ルート画面をタイムラインに設定 */}
      </Routes>
    </Router>
  </StrictMode>
);
