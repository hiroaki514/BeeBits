import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import ConfirmModal from './components/ConfirmModal';

const LoadingMessage = styled.p`
  font-size: 20px;
  color: #666;
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/session', {
      credentials: 'include',
    })
      .then((response) => response.json())
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

  const handlePost = async (content: string) => {
    if (!content.trim()) {
      setSuccessMessage('投稿内容を入力してください');
      return;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      setSuccessMessage('投稿は140文字以内で入力してください');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/timelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newTimeline = await response.json();
        setTimelines((prev) => [newTimeline, ...prev]);
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

  const confirmDelete = (id: number) => setDeleteTargetId(id);
  const cancelDelete = () => setDeleteTargetId(null);

  const executeDelete = async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${deleteTargetId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        await loadTimelines();
        setSuccessMessage('投稿が削除されました');
      } else {
        setSuccessMessage('削除に失敗しました');
      }
    } catch (error) {
      console.error('削除エラー:', error);
      setSuccessMessage('削除中にエラーが発生しました');
    } finally {
      setDeleteTargetId(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  if (isLoggedIn === null) return <LoadingMessage>ロード中です...</LoadingMessage>;
  if (!isLoggedIn) {
    window.location.href = 'http://localhost:3000/users/sign_in';
    return null;
  }

  return (
    <>
      <PostForm
        onSubmit={handlePost}
        submitLabel="投稿する"
        placeholder="新しい投稿を書く..."
      />

      {timelines.map((timeline) => (
        <PostCard
          key={timeline.id}
          userName={timeline.user.name}
          userId={timeline.user.beebits_name}
          content={timeline.content}
          favoriteCount={timeline.favorites_count}
          replyCount={timeline.total_replies_count}
          isLiked={timeline.is_liked}
          postId={timeline.id}
          isOwnPost={timeline.user.id === currentUserId}
          onDelete={confirmDelete}
          onNavigate={() => navigate(`/timelines/${timeline.id}`)}
        />
      ))}

      <ConfirmModal
        visible={deleteTargetId !== null}
        message="この投稿を削除しますか？"
        onCancel={cancelDelete}
        onConfirm={executeDelete}
      />
    </>
  );
};

export default TimeLine;
