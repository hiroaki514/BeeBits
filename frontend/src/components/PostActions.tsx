import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegCommentDots, FaRetweet, FaHeart } from 'react-icons/fa';

interface PostActionsProps {
  replyCount: number;
  retweetCount: number;
  favoriteCount: number;
  isLiked: boolean;
}

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
    color: #1da1f2;
  }
`;

const PostActions: React.FC<PostActionsProps> = ({
  replyCount,
  retweetCount,
  favoriteCount,
  isLiked
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [tempLikeCount, setTempLikeCount] = useState(favoriteCount);
  const [retweeted, setRetweeted] = useState(false);
  const [tempRetweetCount, setTempRetweetCount] = useState(retweetCount);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setTempLikeCount(tempLikeCount - 1);
    } else {
      setTempLikeCount(tempLikeCount + 1);
    }
    setLiked(!liked);
  };

  const toggleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (retweeted) {
      setTempRetweetCount(tempRetweetCount - 1);
    } else {
      setTempRetweetCount(tempRetweetCount + 1);
    }
    setRetweeted(!retweeted);
  };

  const onReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 仮置き：挙動なし（将来実装予定）
  };

  return (
    <ActionRow>
      <IconWrap onClick={onReplyClick}><FaRegCommentDots /> {replyCount}</IconWrap>
      <IconWrap onClick={toggleRetweet}><FaRetweet /> {tempRetweetCount}</IconWrap>
      <IconWrap onClick={toggleLike}><FaHeart color={liked ? 'red' : undefined} /> {tempLikeCount}</IconWrap>
    </ActionRow>
  );
};

export default PostActions;
