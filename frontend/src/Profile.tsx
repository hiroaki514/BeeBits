import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StyledDiv = styled.div`
  margin: 20px;
`;

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<{ name: string; beebits_name: string; bio: string; created_at: string } | null>(null);
  const [timelines, setTimelines] = useState<Array<{ id: number; content: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`/profiles/${userId}`)
      .then((response) => {
        setUser(response.data.user);
        setTimelines(response.data.timelines || []);
      })
      .catch((error) => {
        setError("データの取得に失敗しました");
        console.error("APIエラー:", error);
      });
  }, [userId]);

  if (error) {
    return <StyledDiv>{error}</StyledDiv>;
  }

  if (!user) {
    return <StyledDiv>Loading...</StyledDiv>;
  }

  return (
    <StyledDiv>
      <h1>{user.name}</h1>
      <p>{user.beebits_name}</p>
      <p>{user.bio}</p>
      <p>{new Date(user.created_at).getFullYear()}年 {new Date(user.created_at).getMonth() + 1}月から利用しています</p>

      <a href={`/users/${userId}/edit`}>プロフィールを編集</a>

      <div className="user-posts">
        {timelines.map((timeline) => (
          <StyledDiv key={timeline.id}>
            <p>{timeline.content}</p>
          </StyledDiv>
        ))}
      </div>

      <a href="/timelines">タイムラインへ戻る</a>
    </StyledDiv>
  );
};

export default Profile;
