import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import TimeLine from './TimeLine';
import TimelineDetail from './TimelineDetail';
import AppLayout from './layouts/AppLayout';

// ログイン状態を確認してリダイレクト処理を行うコンポーネント
const LoginRedirect = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/session', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.logged_in);
      })
      .catch((error) => {
        console.error('Error fetching login status:', error);
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === null) return null;

  return isLoggedIn ? (
    <Navigate to="/timelines" />
  ) : (
    (window.location.href = 'http://localhost:3000/users/sign_in')
  );
};

// Layout経由で children を表示
const LayoutWithOutlet = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* 未ログインリダイレクト */}
        <Route path="/" element={<LoginRedirect />} />
        {/* AppLayout経由でページ表示 */}
        <Route element={<LayoutWithOutlet />}>
          <Route path="/timelines" element={<TimeLine />} />
          <Route path="/timelines/:id" element={<TimelineDetail />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
