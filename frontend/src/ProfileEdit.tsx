import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StyledDiv = styled.div`
  margin: 20px;
`;

const ProfileEdit: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; bio: string } | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`/profiles/${userId}`)
      .then((response) => {
        setUser(response.data.user);
        setName(response.data.user.name);
        setBio(response.data.user.bio);
      })
      .catch((error) => {
        setError("データの取得に失敗しました");
        console.error("APIエラー:", error);
      });
  }, [userId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios.put(`/profiles/${userId}`, { name, bio })
      .then(() => {
        navigate(`/profiles/${userId}`);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setError("更新に失敗しました");
        }
        console.error("更新エラー:", error);
      });
  };

  if (error) {
    return <StyledDiv>{error}</StyledDiv>;
  }

  if (!user) {
    return <StyledDiv>Loading...</StyledDiv>;
  }

  return (
    <StyledDiv>
      <h1>プロフィール編集</h1>

      {errors.length > 0 && (
        <div id="error_explanation">
          <h2>{errors.length}件のエラーが発生しました:</h2>
          <ul>
            {errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bio">自己紹介</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">更新</button>
        </div>
      </form>

      <button onClick={() => navigate(`/profiles/${userId}`)}>キャンセル</button>
    </StyledDiv>
  );
};

export default ProfileEdit;
