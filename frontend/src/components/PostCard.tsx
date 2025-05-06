import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaRetweet, FaEllipsisH } from 'react-icons/fa';

interface PostCardProps {
  userName: string;
  userId: string;
  content: string;
  favoriteCount: number;
  replyCount: number;
  retweetCount?: number;
  isLiked?: boolean;
  isOwnPost?: boolean;
  postId?: number;
  avatarUrl?: string;
  onDelete?: () => void;
  onReport?: () => void;
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

const OptionsWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 16px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 100;
  padding: 8px 0;
  min-width: 160px;
`;

const OptionItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f8fa;
  }
`;

const PostCard: React.FC<PostCardProps> = ({
  userName,
  userId,
  content,
  favoriteCount,
  replyCount,
  retweetCount = 0,
  isLiked = false,
  isOwnPost = false,
  onDelete,
  onReport,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [retweeted, setRetweeted] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <Card>
      <Avatar />
      <ContentWrapper>
        <Header>
          <UserInfo>
            {userName} <span>{userId}</span>
          </UserInfo>
          <div onClick={(e) => { e.stopPropagation(); setShowOptions((prev) => !prev); }}>
            <FaEllipsisH style={{ cursor: 'pointer' }} />
          </div>
          {showOptions && (
            <OptionsWrapper ref={optionsRef} onClick={(e) => e.stopPropagation()}>
              {isOwnPost ? (
                <>
                  <OptionItem onClick={onDelete}>削除</OptionItem>
                  <OptionItem>プロフィールに固定</OptionItem>
                  <OptionItem>返信可能ユーザーを変更</OptionItem>
                </>
              ) : (
                <OptionItem onClick={onReport}>この投稿を通報</OptionItem>
              )}
            </OptionsWrapper>
          )}
        </Header>
        <PostText>{content}</PostText>
        <ActionRow>
          <IconWrap onClick={(e) => e.stopPropagation()}>
            <FaRegCommentDots />
            {replyCount}
          </IconWrap>
          <IconWrap onClick={(e) => { e.stopPropagation(); setRetweeted(!retweeted); }}>
            <FaRetweet color={retweeted ? 'green' : undefined} />
            {retweetCount}
          </IconWrap>
          <IconWrap onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}>
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            {favoriteCount}
          </IconWrap>
        </ActionRow>
      </ContentWrapper>
    </Card>
  );
};

export default PostCard;
