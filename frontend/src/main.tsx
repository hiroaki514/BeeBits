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
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: auto;             /* ✅ 高さ制限を解除 */
    overflow-x: hidden;
    overflow-y: visible;      /* ✅ ブラウザの縦スクロールを有効にする */
  }
`;

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

const LayoutWithOutlet = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<LoginRedirect />} />
        <Route element={<LayoutWithOutlet />}>
          <Route path="/timelines" element={<TimeLine />} />
          <Route path="/timelines/:id" element={<TimelineDetail />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
