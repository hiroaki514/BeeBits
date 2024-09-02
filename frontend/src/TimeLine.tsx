import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
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
