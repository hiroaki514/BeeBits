import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import ConfirmModal from './components/ConfirmModal';

interface Timeline {
  id: number;
  content: string;
  user: { id: number; name: string; beebits_name: string };
  favorites_count: number;
  parent_id?: number;
  replies?: Timeline[];
  is_deleted?: boolean;
  total_replies_count?: number;
  is_liked: boolean;
}

const MAX_CONTENT_LENGTH = 140;

const TimelineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchTimeline();
  }, [id]);

  const fetchTimeline = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${id}`, { credentials: 'include' });
      if (!response.ok) throw new Error('投稿の取得に失敗しました');
      const data = await response.json();
      setTimeline(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setError('投稿の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/session', { credentials: 'include' });
      const data = await response.json();
      if (data.logged_in) setCurrentUserId(data.user.id);
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました');
    }
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim() || replyContent.length > MAX_CONTENT_LENGTH) return;
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/api/timelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: replyContent, parent_id: id }),
      });
      if (!response.ok) throw new Error();
      setReplyContent('');
      await fetchTimeline();
    } catch {
      setError('リプライの投稿に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (postId: number) => {
    setDeleteTargetId(postId);
  };

  const cancelDelete = () => {
    setDeleteTargetId(null);
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${deleteTargetId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        console.error('削除失敗:', error);
        throw new Error();
      }
      navigate('/timelines');
    } catch (err) {
      console.error('削除エラー詳細:', err);
      setError('削除に失敗しました');
    } finally {
      setDeleteTargetId(null);
    }
  };

  const renderReplies = (replies: Timeline[]) => {
    return replies.map((reply) => (
      <div key={reply.id} style={{ marginTop: 20 }}>
        <PostCard
          userName={reply.user.name}
          userId={reply.user.beebits_name}
          content={reply.content}
          favoriteCount={reply.favorites_count}
          replyCount={reply.total_replies_count ?? 0}
          isLiked={reply.is_liked}
          postId={reply.id}
          isOwnPost={reply.user.id === currentUserId}
          onDelete={confirmDelete}
        />
      </div>
    ));
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!timeline) return <div>投稿が見つかりません。</div>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => timeline.parent_id ? navigate(`/timelines/${timeline.parent_id}`) : navigate('/timelines')} style={{ marginBottom: 10 }}>
        ← 戻る
      </button>

      <h2>投稿詳細</h2>
      <PostCard
        userName={timeline.user.name}
        userId={timeline.user.beebits_name}
        content={timeline.content}
        favoriteCount={timeline.favorites_count}
        replyCount={timeline.total_replies_count ?? 0}
        isLiked={timeline.is_liked}
        postId={timeline.id}
        isOwnPost={timeline.user.id === currentUserId}
        onDelete={confirmDelete}
      />

      <div style={{ marginTop: 30 }}>
        <h3>リプライを投稿</h3>
        <PostForm
          onSubmit={handleReplySubmit}
          value={replyContent}
          onChange={setReplyContent}
          submitLabel="リプライする"
          placeholder="リプライを入力..."
          disabled={submitting}
        />
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>リプライ一覧</h3>
        {timeline.replies && timeline.replies.length > 0 ? (
          renderReplies(timeline.replies)
        ) : (
          <div>リプライはありません。</div>
        )}
      </div>

      <ConfirmModal
        visible={deleteTargetId !== null}
        message="この投稿を削除しますか？"
        onCancel={cancelDelete}
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default TimelineDetail;
