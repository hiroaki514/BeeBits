import React from 'react';
import PostCard from './PostCard';

interface Timeline {
  id: number;
  content: string;
  favorites_count: number;
  total_replies_count: number;
  is_liked: boolean;
  user: {
    id: number;
    name: string;
    beebits_name: string;
  };
}

interface PostListProps {
  posts: Timeline[];
  currentUserId: number | null;
  onDelete?: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, currentUserId, onDelete }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <PostCard
            userName={post.user.name}
            userId={post.user.beebits_name}
            content={post.content}
            favoriteCount={post.favorites_count}
            replyCount={post.total_replies_count}
            isLiked={post.is_liked}
            postId={post.id}
            isOwnPost={post.user.id === currentUserId}
            onDelete={onDelete}
          />
        </div>
      ))}
    </>
  );
};

export default PostList;
