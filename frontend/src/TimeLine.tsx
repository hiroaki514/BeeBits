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
  transition: background-color 0.2s;

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

interface Timeline {
  id: number;
  content: string;
  favorites_count: number;
  total_replies_count: number;
  is_liked: boolean;
  parent_id?: number | null;
  user: { id: number; name: string; beebits_name: string };
}

const TimeLine: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [newContent, setNewContent] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState<Timeline | null>(null);
  const [popupContent, setPopupContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/session', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setIsLoggedIn(data.logged_in));
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setTimelines((prev) => prev.filter((timeline) => timeline.id !== id));
        setSuccessMessage('投稿が削除されました');
      } else {
        setSuccessMessage('削除に失敗しました');
      }
    } catch (error) {
      console.error('削除エラー:', error);
      setSuccessMessage('削除中にエラーが発生しました');
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
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

      if (response.ok) {
        setPopupContent('');
        setShowPopup(false);
        await loadTimelines(); // ✅ 即時反映
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
            <div>{timeline.content}</div>
            <div>いいね数: {timeline.favorites_count}</div>
            <div>リプライ数: {timeline.total_replies_count}</div>
            <button onClick={(e) => {
              e.stopPropagation();
              handleDelete(timeline.id);
            }}>削除</button>
            <button onClick={(e) => {
              e.stopPropagation();
              setPopupTarget(timeline);
              setShowPopup(true);
            }}>リプライ</button>
          </TimelineItem>
        ))}
      </Container>

      {/* 🔽 ポップアップ */}
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
    </>
  );
};

export default TimeLine;
