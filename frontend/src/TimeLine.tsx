import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #add8e6;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 28px;
  color: #333;
`;

const LoadingMessage = styled.p`
  font-size: 20px;
  color: #666;
`;

const TimeLine: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // RailsのAPIを呼び出してログイン状態を確認
    fetch('http://localhost:3000/api/session', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.logged_in);
      });
  }, []);

  if (isLoggedIn === null) {
    // ローディング中の表示
    return (
      <Container>
        <LoadingMessage>ロード中です...</LoadingMessage>
      </Container>
    );
  }

  if (!isLoggedIn) {
    // 外部URLへリダイレクト
    window.location.href = 'http://localhost:3000/users/sign_in';
    return null;
  }

  const handleLogout = async () => {
    try {
      // CSRFトークンを取得
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');

      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '', // CSRFトークンをヘッダーに追加
        },
        credentials: 'include',
      });

      if (response.ok) {
        alert('ログアウトしました');
        setIsLoggedIn(false); // ログアウト状態を設定
      } else {
        alert('ログアウトに失敗しました');
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
      alert('ログアウト中にエラーが発生しました');
    }
  };

  return (
    <Container>
      <Header>タイムライン</Header>
      <p>ここにタイムラインのコンテンツが表示されます。</p>
      <button onClick={handleLogout}>ログアウト</button>
    </Container>
  );
};

export default TimeLine;
