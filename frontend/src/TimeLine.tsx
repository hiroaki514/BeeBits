import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #add8e6;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 28px;
  color: #333;
`;

const TimeLine: React.FC = () => {
  return (
    <Container>
      <Header>タイムライン</Header>
      <p>ここにタイムラインのコンテンツが表示されます。</p>
    </Container>
  );
};

export default TimeLine;
