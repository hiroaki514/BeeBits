import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const LoadingMessage = styled.p`
  font-size: 20px;
  color: #666;
`;

const PostFormWrapper = styled.div`
  margin: 20px 0;
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

interface Timeline {
  id: number;
  content: string;
  favorites_count: number;
  total_replies_count: number;
  is_liked: boolean;
  parent_id?: number | null;
  user: { id: number; name: string; beebits_name: string };
}

const MAX_CONTENT_LENGTH = 140;

const TimeLine: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [newContent, setNewContent] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.logged_in);
        setCurrentUserId(data.user?.id || null);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadTimelines();
    }
  }, [isLoggedIn]);

  const loadTimelines = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/timelines', {
        credentials: 'include',
      });
      const data = await response.json();
      const rootPosts = data.filter((t: Timeline) => t.parent_id == null);
      setTimelines(rootPosts);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  };

  const handlePost = async () => {
    if (!newContent.trim()) {
      setSuccessMessage('投稿内容を入力してください');
      return;
    }
    if (newContent.length > MAX_CONTENT_LENGTH) {
      setSuccessMessage('投稿は140文字以内で入力してください');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/timelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: newContent }),
      });

      if (response.ok) {
        const newTimeline = await response.json();
        setTimelines((prev) => [newTimeline, ...prev]);
        setNewContent('');
        setSuccessMessage('投稿が作成されました');
      } else {
        setSuccessMessage('投稿に失敗しました');
      }
    } catch (error) {
      console.error('投稿エラー:', error);
      setSuccessMessage('投稿中にエラーが発生しました');
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleDelete = async (targetId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${targetId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error();
      await loadTimelines();
    } catch {
      setSuccessMessage('削除に失敗しました');
    }
  };

  if (isLoggedIn === null) return <LoadingMessage>ロード中です...</LoadingMessage>;
  if (!isLoggedIn) {
    window.location.href = 'http://localhost:3000/users/sign_in';
    return null;
  }

  return (
    <>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <PostFormWrapper>
        <PostForm
          onSubmit={handlePost}
          value={newContent}
          onChange={setNewContent}
          submitLabel="投稿する"
          placeholder="新しい投稿を書く..."
          disabled={false}
        />
      </PostFormWrapper>

      <PostList
        posts={timelines}
        currentUserId={currentUserId}
        onDelete={handleDelete}
      />
    </>
  );
};

export default TimeLine;
