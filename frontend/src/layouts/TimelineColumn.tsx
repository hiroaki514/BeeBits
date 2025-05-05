// frontend/src/layouts/TimelineColumn.tsx
import React from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';

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

const Container = styled.div`
  width: 100%;
`;

interface Props {
  timelines?: Timeline[]; // 任意のpropsとして保持
}

const TimelineColumn: React.FC<React.PropsWithChildren<Props>> = ({ timelines, children }) => {
  return (
    <Container>
      {Array.isArray(timelines) &&
        timelines.map((timeline) => (
          <PostCard
            key={timeline.id}
            userName={timeline.user.name}
            userId={timeline.user.beebits_name}
            content={timeline.content}
            favoriteCount={timeline.favorites_count}
            replyCount={timeline.total_replies_count}
            isLiked={timeline.is_liked}
          />
        ))}
      {children}
    </Container>
  );
};

export default TimelineColumn;
