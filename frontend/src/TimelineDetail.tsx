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

  useEffect(() => {
    console.log('ID:', id); // IDの確認
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/timelines/${id}`, {
          credentials: 'include',
        });
        console.log('Response:', response); // レスポンスの確認
        if (!response.ok) {
          throw new Error('投稿の取得に失敗しました');
        }
        const data = await response.json();
        console.log('Fetched Data:', data); // 取得データの確認
        setTimeline(data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
        setError(error instanceof Error ? error.message : '予期しないエラー');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    console.error('Error:', error); // エラーメッセージの出力
    return <div>{error}</div>;
  }

  if (!timeline) {
    return <div>投稿が見つかりません。</div>;
  }

  // リプライツリーの表示
  const renderReplies = (replies: Timeline[]) => {
    return replies.map((reply) => (
      <div key={reply.id} style={{ marginLeft: '20px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
        <div>
          <strong>{reply.user.name}</strong> ({reply.user.beebits_name})
        </div>
        <div>{reply.content}</div>
        <div>いいね数: {reply.favorites_count}</div>
        {/* 再帰的にリプライがあれば表示 */}
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

      {/* リプライツリーがあれば表示 */}
      <div style={{ marginTop: '20px' }}>
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
