import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaReply, FaRetweet, FaEllipsisH } from 'react-icons/fa';

interface PostCardProps {
  userName: string;
  userId: string;
  content: string;
  favoriteCount: number;
  replyCount: number;
  retweetCount?: number; // 今回はUIのみ対応
  isLiked?: boolean;     // 仮：アイコン切り替えの有無
  avatarUrl?: string;    // 将来対応用、今はダミーでOK
}

const Card = styled.div`
  background-color: #fff;
  padding: 16px;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ccc;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  font-weight: bold;

  span {
    color: #657786;
    font-weight: normal;
    margin-left: 6px;
  }
`;

const PostText = styled.div`
  margin: 6px 0;
  white-space: pre-wrap;
  font-size: 15px;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 8px;
  font-size: 14px;
  color: #657786;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const PostCard: React.FC<PostCardProps> = ({
  userName,
  userId,
  content,
  favoriteCount,
  replyCount,
  retweetCount = 0,
  isLiked = false,
  avatarUrl,
}) => {
  return (
    <Card>
      <Avatar />
      <ContentWrapper>
        <Header>
          <UserInfo>
            {userName} <span>{userId}</span>
          </UserInfo>
          <FaEllipsisH />
        </Header>
        <PostText>{content}</PostText>
        <ActionRow>
          <IconWrap><FaReply /> {replyCount}</IconWrap>
          <IconWrap><FaRetweet /> {retweetCount}</IconWrap>
          <IconWrap><FaHeart color={isLiked ? 'red' : undefined} /> {favoriteCount}</IconWrap>
        </ActionRow>
      </ContentWrapper>
    </Card>
  );
};

export default PostCard;
