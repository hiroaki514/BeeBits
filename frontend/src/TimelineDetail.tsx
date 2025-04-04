import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Timeline {
  id: number;
  content: string;
  user: { id: number; name: string; beebits_name: string };
  favorites_count: number;
  parent_id?: number;
  replies?: Timeline[];
}

const TimelineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState<Timeline | null>(null);
  const [popupContent, setPopupContent] = useState<string>('');

  const fetchTimeline = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('投稿の取得に失敗しました');
      const data = await response.json();
      setTimeline(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setError(error instanceof Error ? error.message : '予期しないエラー');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/session', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.logged_in) {
        setCurrentUserId(data.user.id);
      }
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました');
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchTimeline();
  }, [id]);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3000/api/timelines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: replyContent,
          parent_id: id,
        }),
      });

      if (!response.ok) throw new Error('リプライの投稿に失敗しました');

      setReplyContent('');
      await fetchTimeline();
    } catch (error) {
      console.error('リプライ投稿エラー:', error);
      setError('リプライの投稿に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePopupSubmit = async () => {
    if (!popupTarget || !popupContent.trim()) return;
    try {
      const response = await fetch(`http://localhost:3000/api/timelines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: popupContent,
          parent_id: popupTarget.id,
        }),
      });

      if (!response.ok) throw new Error('リプライの投稿に失敗しました');

      setPopupContent('');
      setShowPopup(false);
      await fetchTimeline();
    } catch (error) {
      console.error('ポップアップ投稿エラー:', error);
      setError('リプライの投稿に失敗しました');
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!timeline) return <div>投稿が見つかりません。</div>;

  const renderReplies = (replies: Timeline[]) => {
    return replies.map((reply) => {
      const shouldDisplay =
        reply.parent_id === timeline.id || reply.user.id === currentUserId;

      if (!shouldDisplay) return null;

      return (
        <div
          key={reply.id}
          style={{
            marginLeft: '20px',
            borderLeft: '2px solid #ccc',
            paddingLeft: '10px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/timelines/${reply.id}`)}
        >
          <div>
            <strong>{reply.user.name}</strong> ({reply.user.beebits_name})
          </div>
          <div>{reply.content}</div>
          <div>いいね数: {reply.favorites_count}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPopupTarget(reply);
              setShowPopup(true);
            }}
          >
            リプライ
          </button>
          {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies)}
        </div>
      );
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 🔙 戻るボタン（親があればその詳細、なければ一覧へ） */}
      <button
        onClick={() => {
          if (timeline.parent_id) {
            navigate(`/timelines/${timeline.parent_id}`);
          } else {
            navigate('/timelines');
          }
        }}
        style={{
          marginBottom: '10px',
          padding: '6px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0',
          cursor: 'pointer'
        }}
      >
        ← 戻る
      </button>

      <h2>投稿詳細</h2>
      <div>
        <strong>{timeline.user.name}</strong> ({timeline.user.beebits_name})
      </div>
      <div>{timeline.content}</div>
      <div>いいね数: {timeline.favorites_count}</div>

      <div style={{ marginTop: '30px' }}>
        <h3>リプライを投稿</h3>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button onClick={handleReplySubmit} disabled={submitting}>
          {submitting ? '投稿中...' : 'リプライする'}
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>リプライ</h3>
        {timeline.replies && timeline.replies.length > 0 ? (
          renderReplies(timeline.replies)
        ) : (
          <div>リプライはありません。</div>
        )}
      </div>

      {showPopup && popupTarget && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: '400px' }}>
            <h4>リプライ対象：</h4>
            <p><strong>{popupTarget.user.name}</strong>（{popupTarget.user.beebits_name}）</p>
            <p>{popupTarget.content}</p>
            <textarea
              value={popupContent}
              onChange={(e) => setPopupContent(e.target.value)}
              rows={4}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowPopup(false)} style={{ marginRight: '10px' }}>キャンセル</button>
              <button onClick={handlePopupSubmit}>リプライする</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineDetail;
