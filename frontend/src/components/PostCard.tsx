import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegCommentDots, FaRetweet, FaEllipsisH } from 'react-icons/fa';
import PopupMenu from './PopupMenu';

interface PostCardProps {
  userName: string;
  userId: string;
  content: string;
  favoriteCount: number;
  replyCount: number;
  retweetCount?: number;
  isLiked?: boolean;
  avatarUrl?: string;
  postId: number;
  isOwnPost: boolean;
  onDelete?: (postId: number) => void;
}

const Card = styled.div`
  background-color: #fff;
  padding: 16px;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  gap: 12px;
  position: relative;
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

const MenuWrapper = styled.div`
  position: relative;
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
  postId,
  isOwnPost,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(postId);
      setMenuOpen(false);
    }
  };

  return (
    <Card>
      <Avatar />
      <ContentWrapper>
        <Header>
          <UserInfo>
            {userName} <span>{userId}</span>
          </UserInfo>
          <MenuWrapper>
            <FaEllipsisH style={{ cursor: 'pointer' }} onClick={handleMenuToggle} />
            {menuOpen && (
              <PopupMenu
                isOwnPost={isOwnPost}
                onClose={() => setMenuOpen(false)}
                onDelete={handleDeleteClick}
              />
            )}
          </MenuWrapper>
        </Header>
        <PostText>{content}</PostText>
        <ActionRow>
          <IconWrap><FaRegCommentDots /> {replyCount}</IconWrap>
          <IconWrap><FaRetweet /> {retweetCount}</IconWrap>
          <IconWrap><FaHeart color={isLiked ? 'red' : undefined} /> {favoriteCount}</IconWrap>
        </ActionRow>
      </ContentWrapper>
    </Card>
  );
};

export default PostCard;
