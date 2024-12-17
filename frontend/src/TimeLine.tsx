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

const TimelineItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const LoadingMessage = styled.p`
  font-size: 20px;
  color: #666;
`;

const PostForm = styled.div`
  margin: 20px 0;
  textarea {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
  }
`;

interface Timeline {
  id: number;
  content: string;
  favorites_count: number;
  is_liked: boolean; // いいね済みかどうか
  user: { id: number; name: string; beebits_name: string };
}

const TimeLine: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [newContent, setNewContent] = useState<string>(''); // 新しい投稿用

  // ログイン状態の確認
  useEffect(() => {
    fetch('http://localhost:3000/api/session', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setIsLoggedIn(data.logged_in));
  }, []);

  // タイムラインデータの取得
  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:3000/api/timelines', {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => setTimelines(data))
        .catch((error) => console.error('データ取得エラー:', error));
    }
  }, [isLoggedIn]);

  // 投稿の作成
  const handlePost = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/timelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Cookie情報を含める
        body: JSON.stringify({
          content: newContent,
        }),
      });
  
      if (response.ok) {
        const newTimeline = await response.json();
        setTimelines((prev) => [newTimeline, ...prev]);
        setNewContent('');
        alert('投稿が作成されました');
      } else {
        alert('投稿に失敗しました');
      }
    } catch (error) {
      console.error('投稿エラー:', error);
      alert('投稿中にエラーが発生しました');
    }
  };

  // いいね追加・解除
  const handleLike = async (id: number, isLiked: boolean) => {
    const url = isLiked
      ? `http://localhost:3000/api/timelines/${id}/unlike`
      : `http://localhost:3000/api/timelines/${id}/like`;

    try {
      const response = await fetch(url, {
        method: isLiked ? 'DELETE' : 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setTimelines((prev) =>
          prev.map((timeline) =>
            timeline.id === id
              ? {
                  ...timeline,
                  favorites_count: isLiked
                    ? timeline.favorites_count - 1
                    : timeline.favorites_count + 1,
                  is_liked: !isLiked,
                }
              : timeline
          )
        );
      } else {
        alert('いいね操作に失敗しました');
      }
    } catch (error) {
      console.error('いいねエラー:', error);
    }
  };

  // 投稿の削除
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setTimelines((prev) => prev.filter((timeline) => timeline.id !== id));
        alert('投稿が削除されました');
      } else {
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('削除エラー:', error);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('ログアウトしました');
        window.location.href = 'http://localhost:3000/users/sign_in';
      } else {
        alert('ログアウトに失敗しました');
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  if (isLoggedIn === null) {
    return (
      <Container>
        <LoadingMessage>ロード中です...</LoadingMessage>
      </Container>
    );
  }

  if (!isLoggedIn) {
    window.location.href = 'http://localhost:3000/users/sign_in';
    return null;
  }

  return (
    <Container>
      <Header>タイムライン</Header>
      <PostForm>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="新しい投稿を書く..."
        ></textarea>
        <button onClick={handlePost}>投稿する</button>
      </PostForm>
      {timelines.map((timeline) => (
        <TimelineItem key={timeline.id}>
          <div>
            <strong>
              <a href={`/profiles/${timeline.user.id}`}>
                {timeline.user.name}
              </a>
            </strong>{' '}
            {timeline.user.beebits_name}
          </div>
          <div>{timeline.content}</div>
          <div>いいね数: {timeline.favorites_count}</div>
          <button onClick={() => handleLike(timeline.id, timeline.is_liked)}>
            {timeline.is_liked ? 'いいねを外す' : 'いいね'}
          </button>
          <button onClick={() => handleDelete(timeline.id)}>削除</button>
        </TimelineItem>
      ))}
      <button onClick={handleLogout}>ログアウト</button>
    </Container>
  );
};

export default TimeLine;
