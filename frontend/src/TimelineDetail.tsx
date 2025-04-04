import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Timeline {
  id: number;
  content: string;
  user: { id: number; name: string; beebits_name: string };
  favorites_count: number;
  parent_id?: number;
  replies?: Timeline[];
  is_deleted?: boolean;
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

  const [showPopup, setShowPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState<Timeline | null>(null);
  const [popupContent, setPopupContent] = useState('');

  const [confirmTargetId, setConfirmTargetId] = useState<number | null>(null);

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

  const handlePopupSubmit = async () => {
    if (!popupTarget || !popupContent.trim() || popupContent.length > MAX_CONTENT_LENGTH) return;
    try {
      const response = await fetch('http://localhost:3000/api/timelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: popupContent, parent_id: popupTarget.id }),
      });
      if (!response.ok) throw new Error();
      setPopupContent('');
      setShowPopup(false);
      await fetchTimeline();
    } catch {
      setError('リプライの投稿に失敗しました');
    }
  };

  const handleDelete = async (targetId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${targetId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error();
      setConfirmTargetId(null);
      await fetchTimeline();
    } catch {
      setError('削除に失敗しました');
    }
  };

  const renderReplies = (replies: Timeline[], rootUserId: number, level = 1): JSX.Element[] => {
    return replies.flatMap((reply) => {
      const isRootUser = reply.user.id === rootUserId;
      if (level === 1 || (level === 2 && isRootUser)) {
        return [
          <div key={reply.id} style={{ marginLeft: level * 20, borderLeft: '2px solid #ccc', paddingLeft: 10, cursor: 'pointer' }} onClick={() => navigate(`/timelines/${reply.id}`)}>
            <div><strong>{reply.user.name}</strong>（{reply.user.beebits_name}）</div>
            <div>{reply.content}</div>
            <div>いいね数: {reply.favorites_count}</div>
            <button onClick={(e) => { e.stopPropagation(); setPopupTarget(reply); setShowPopup(true); }}>リプライ</button>
            {currentUserId === reply.user.id && (
              <button style={{ marginLeft: '10px' }} onClick={(e) => { e.stopPropagation(); setConfirmTargetId(reply.id); }}>
                削除
              </button>
            )}
            {reply.replies && renderReplies(reply.replies, rootUserId, level + 1)}
          </div>,
        ];
      }
      return [];
    });
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
      <div><strong>{timeline.user.name}</strong>（{timeline.user.beebits_name}）</div>
      <div>{timeline.content}</div>
      <div>いいね数: {timeline.favorites_count}</div>

      {currentUserId === timeline.user.id && (
        <button style={{ marginTop: 10 }} onClick={() => setConfirmTargetId(timeline.id)}>
          削除
        </button>
      )}

      <div style={{ marginTop: 30 }}>
        <h3>リプライを投稿</h3>
        <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} rows={4} style={{ width: '100%', marginBottom: 10 }} />
        <div style={{ fontSize: '12px', color: replyContent.length > MAX_CONTENT_LENGTH ? 'red' : '#666' }}>
          {replyContent.length} / {MAX_CONTENT_LENGTH}
        </div>
        {replyContent.length > MAX_CONTENT_LENGTH && (
          <div style={{ color: 'red', fontSize: '14px' }}>
            140文字以内で入力してください。
          </div>
        )}
        <button onClick={handleReplySubmit} disabled={submitting || replyContent.length > MAX_CONTENT_LENGTH || !replyContent.trim()}>
          {submitting ? '投稿中...' : 'リプライする'}
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>リプライ</h3>
        {timeline.replies && timeline.replies.length > 0
          ? renderReplies(timeline.replies, timeline.user.id)
          : <div>リプライはありません。</div>}
      </div>

      {showPopup && popupTarget && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 400 }}>
            <h4>リプライ対象：</h4>
            <p><strong>{popupTarget.user.name}</strong>（{popupTarget.user.beebits_name}）</p>
            <p>{popupTarget.content}</p>
            <textarea value={popupContent} onChange={(e) => setPopupContent(e.target.value)} rows={4} style={{ width: '100%', marginBottom: 10 }} />
            <div style={{ fontSize: '12px', color: popupContent.length > MAX_CONTENT_LENGTH ? 'red' : '#666' }}>
              {popupContent.length} / {MAX_CONTENT_LENGTH}
            </div>
            {popupContent.length > MAX_CONTENT_LENGTH && (
              <div style={{ color: 'red', fontSize: '14px' }}>
                140文字以内で入力してください。
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowPopup(false)} style={{ marginRight: 10 }}>キャンセル</button>
              <button onClick={handlePopupSubmit} disabled={popupContent.length > MAX_CONTENT_LENGTH || !popupContent.trim()}>
                リプライする
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmTargetId !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 350 }}>
            <p>この投稿を削除してもよろしいですか？</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmTargetId(null)} style={{ marginRight: 10 }}>キャンセル</button>
              <button onClick={() => handleDelete(confirmTargetId)}>削除する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineDetail;
