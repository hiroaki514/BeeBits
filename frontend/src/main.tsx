import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // ✅ Navigate を追加
import TimeLine from './TimeLine';
import TimelineDetail from './TimelineDetail'; // ✅ 投稿詳細用コンポーネントを読み込み

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

  // ✅ 修正：ログイン済みなら /timelines にリダイレクトする
  return isLoggedIn ? (
    <Navigate to="/timelines" />
  ) : (
    (window.location.href = 'http://localhost:3000/users/sign_in')
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* ルート確認および一覧表示用 */}
        <Route path="/" element={<LoginRedirect />} />
        <Route path="/timelines" element={<TimeLine />} />
        {/* ✅ 投稿詳細ページ */}
        <Route path="/timelines/:id" element={<TimelineDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
