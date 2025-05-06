import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaCommentDots, FaRetweet, FaEllipsisH } from 'react-icons/fa';

interface PostCardProps {
  userName: string;
  userId: string;
  content: string;
  favoriteCount: number;
  replyCount: number;
  isLiked: boolean;
  isOwnPost: boolean;
  postId: number;
  onDelete?: (id: number) => void;
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

  &:hover {
    opacity: 0.7;
  }
`;

const MenuPopup = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 8px;
  z-index: 100;
  font-size: 14px;
`;

const PostCard: React.FC<PostCardProps> = ({
  userName,
  userId,
  content,
  favoriteCount,
  replyCount,
  isLiked,
  isOwnPost,
  postId,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card>
      <Avatar />
      <ContentWrapper>
        <Header>
          <UserInfo>
            {userName} <span>@{userId}</span>
          </UserInfo>
          <div style={{ position: 'relative' }}>
            <FaEllipsisH onClick={toggleMenu} style={{ cursor: 'pointer' }} />
            {showMenu && (
              <MenuPopup ref={menuRef}>
                {isOwnPost ? (
                  <div onClick={(e) => { e.stopPropagation(); onDelete?.(postId); setShowMenu(false); }}>
                    投稿を削除
                  </div>
                ) : (
                  <div onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}>
                    違反を報告
                  </div>
                )}
              </MenuPopup>
            )}
          </div>
        </Header>
        <PostText>{content}</PostText>
        <ActionRow onClick={(e) => e.stopPropagation()}>
          <IconWrap><FaCommentDots /> {replyCount}</IconWrap>
          <IconWrap><FaRetweet /> 0</IconWrap>
          <IconWrap>{isLiked ? <FaHeart color="red" /> : <FaRegHeart />} {favoriteCount}</IconWrap>
        </ActionRow>
      </ContentWrapper>
    </Card>
  );
};

export default PostCard;
