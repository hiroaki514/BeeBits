import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledDiv = styled.div`
  margin: 20px;
`;

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; beebits_name: string; bio: string; created_at: string }>({ name: '', beebits_name: '', bio: '', created_at: '' });
  const [timelines, setTimelines] = useState<Array<{ id: number; content: string }>>([]);
  const userId = /* ユーザーIDを取得する適切な方法をここに書いてください */;

  useEffect(() => {
    axios.get(`/profiles/${userId}`).then((response) => {
      setUser(response.data.user);
      setTimelines(response.data.timelines || []);
    });
  }, [userId]);

  return (
    <StyledDiv>
      <h1>{user.name}</h1>
      <p>{user.beebits_name}</p>
      <p>{user.bio}</p>
      <p>{new Date(user.created_at).getFullYear()}年 {new Date(user.created_at).getMonth() + 1}月から利用しています</p>

      {userId === /* current_userのIDを取得する方法 */ && (
        <a href={`/users/${userId}/edit`}>プロフィールを編集</a>
      )}

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
