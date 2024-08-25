import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'; // React RouterのLinkコンポーネントをインポート

const StyledDiv = styled.div`
  margin: 20px;
`;

const TimeLine: React.FC = () => {
  const [timelines, setTimelines] = useState<Array<{ id: number; content: string }>>([]);

  useEffect(() => {
    axios.get('/timelines').then((response) => {
      setTimelines(response.data.timelines || []);
    });
  }, []);

  return (
    <StyledDiv>
      {/* Linkコンポーネントを使用してReact Routerでページ遷移 */}
      <Link to="/profiles/1">自分のプロフィール</Link> {/* ユーザーIDを適切に設定してください */}

      <form action="/timelines" method="post">
        <div>
          <label htmlFor="content">投稿内容:</label>
          <textarea id="content" name="timeline[content]" rows={4}></textarea>
          <button type="submit" className="btn btn-primary">投稿</button>
        </div>
      </form>

      {timelines.map((timeline) => (
        <StyledDiv key={timeline.id}>
          <p>{timeline.content}</p>
        </StyledDiv>
      ))}

      <form action="/users/sign_out" method="post">
        <button type="submit" data-confirm="Are you sure?">ログアウト</button>
      </form>
    </StyledDiv>
  );
};

export default TimeLine;
