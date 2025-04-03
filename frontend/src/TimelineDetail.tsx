import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Timeline {
  id: number;
  content: string;
  user: { id: number; name: string; beebits_name: string };
  favorites_count: number;
  replies?: Timeline[];
}

const TimelineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>(''); // 🔽 追加：リプライ用
  const [submitting, setSubmitting] = useState<boolean>(false); // 投稿中判定

  const fetchTimeline = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/timelines/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('投稿の取得に失敗しました');
      }
      const data = await response.json();
      setTimeline(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setError(error instanceof Error ? error.message : '予期しないエラー');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [id]);

  // 🔽 リプライ投稿処理
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3000/api/timelines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content: replyContent,
          parent_id: id,
        }),
      });

      if (!response.ok) {
        throw new Error('リプライの投稿に失敗しました');
      }

      setReplyContent('');
      await fetchTimeline(); // 🔁 投稿後に再取得してリプライ表示
    } catch (error) {
      console.error('リプライ投稿エラー:', error);
      setError('リプライの投稿に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!timeline) return <div>投稿が見つかりません。</div>;

  const renderReplies = (replies: Timeline[]) => {
    return replies.map((reply) => (
      <div key={reply.id} style={{ marginLeft: '20px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
        <div>
          <strong>{reply.user.name}</strong> ({reply.user.beebits_name})
        </div>
        <div>{reply.content}</div>
        <div>いいね数: {reply.favorites_count}</div>
        {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies)}
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>投稿詳細</h2>
      <div>
        <strong>{timeline.user.name}</strong> ({timeline.user.beebits_name})
      </div>
      <div>{timeline.content}</div>
      <div>いいね数: {timeline.favorites_count}</div>

      {/* 🔽 リプライ投稿フォーム */}
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

      {/* 🔽 リプライツリー */}
      <div style={{ marginTop: '40px' }}>
        <h3>リプライ</h3>
        {timeline.replies && timeline.replies.length > 0 ? (
          renderReplies(timeline.replies)
        ) : (
          <div>リプライはありません。</div>
        )}
      </div>
    </div>
  );
};

export default TimelineDetail;
