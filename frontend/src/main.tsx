import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      })
      .catch((error) => {
        console.error('Error fetching login status:', error);
        setIsLoggedIn(false); // デフォルトで未ログイン扱い
      });
  }, []);

  if (isLoggedIn === null) {
    return null; // ローディング中は何も表示しない
  }

  // ログイン済みの場合はタイムラインを表示、未ログインの場合はログイン画面にリダイレクト
  return isLoggedIn ? (
    <TimeLine />
  ) : (
    // 修正箇所: 外部URLへのリダイレクトにwindow.location.hrefを使用
    (window.location.href = 'http://localhost:3000/users/sign_in')
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* 修正箇所: 明確にルートとタイムラインのパスを指定 */}
        <Route path="/" element={<LoginRedirect />} />
        <Route path="/timelines" element={<TimeLine />} />
      </Routes>
    </Router>
  </StrictMode>
);
