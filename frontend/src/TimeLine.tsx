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

const TimeLine: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // ログイン状態を確認するAPIを呼び出し
    fetch('http://localhost:3000/api/session', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.logged_in) {
          setLoggedIn(true); // ログイン済み
        } else {
          // 未ログインの場合、ログイン画面へリダイレクト
          window.location.href = 'http://localhost:3000/users/sign_in';
        }
      })
      .catch(() => setLoggedIn(false)); // エラー時の対応
  }, []);

  if (loggedIn === null) {
    return <div>Loading...</div>; // ロード中の表示
  }

  return (
    <Container>
      <Header>タイムライン</Header>
      <p>ここにタイムラインのコンテンツが表示されます。</p>
    </Container>
  );
};

export default TimeLine;
