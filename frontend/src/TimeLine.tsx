import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
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

// 🔒 HTMLエスケープ（XSS対策）
const escapeHTML = (str: string) =>
  str.replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;')
     .replace(/'/g, '&#39;');

const TimeLine: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [newContent, setNewContent] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState<Timeline | null>(null);
  const [popupContent, setPopupContent] = useState('');

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

  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
  };

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

  const cancelDelete = () => {
    setDeleteTargetId(null);
  };

  const handlePopupSubmit = async () => {
    if (!popupTarget || !popupContent.trim()) {
      setSuccessMessage('投稿内容を入力してください');
      return;
    }
    if (popupContent.length > MAX_CONTENT_LENGTH) {
      setSuccessMessage('投稿は140文字以内で入力してください');
      return;
    }

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

      if (response.ok) {
        setPopupContent('');
        setShowPopup(false);
        await loadTimelines();
      }
    } catch (e) {
      setSuccessMessage('リプライ投稿に失敗しました');
      setShowPopup(false);
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
    <>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Container>
        <Header>タイムライン</Header>
        <PostForm>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="新しい投稿を書く..."
          />
          <div style={{ fontSize: '12px', color: newContent.length > MAX_CONTENT_LENGTH ? 'red' : '#666' }}>
            {newContent.length} / {MAX_CONTENT_LENGTH}
          </div>
          <button onClick={handlePost}>投稿する</button>
        </PostForm>

        {timelines.map((timeline) => (
          <TimelineItem
            key={timeline.id}
            onClick={() => navigate(`/timelines/${timeline.id}`)}
          >
            <div>
              <strong>
                <a href={`/profiles/${timeline.user.id}`}>
                  {timeline.user.name}
                </a>
              </strong>{' '}
              {timeline.user.beebits_name}
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{escapeHTML(timeline.content)}</div>
            <div>いいね数: {timeline.favorites_count}</div>
            <div>リプライ数: {timeline.total_replies_count}</div>
            {currentUserId === timeline.user.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(timeline.id);
                }}
              >
                削除
              </button>
            )}
            <button onClick={(e) => {
              e.stopPropagation();
              setPopupTarget(timeline);
              setShowPopup(true);
            }}>リプライ</button>
          </TimelineItem>
        ))}
      </Container>

      {showPopup && popupTarget && (
        <ModalOverlay>
          <ModalContent>
            <h4>リプライ対象：</h4>
            <p><strong>{popupTarget.user.name}</strong>（{popupTarget.user.beebits_name}）</p>
            <p style={{ whiteSpace: 'pre-wrap' }}>{escapeHTML(popupTarget.content)}</p>
            <textarea
              value={popupContent}
              onChange={(e) => setPopupContent(e.target.value)}
              rows={4}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div style={{ fontSize: '12px', color: popupContent.length > MAX_CONTENT_LENGTH ? 'red' : '#666' }}>
              {popupContent.length} / {MAX_CONTENT_LENGTH}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowPopup(false)} style={{ marginRight: '10px' }}>キャンセル</button>
              <button onClick={handlePopupSubmit}>リプライする</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {deleteTargetId && (
        <ModalOverlay>
          <ModalContent>
            <p>この投稿を削除しますか？</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={cancelDelete} style={{ marginRight: '10px' }}>キャンセル</button>
              <button onClick={executeDelete}>削除する</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default TimeLine;
