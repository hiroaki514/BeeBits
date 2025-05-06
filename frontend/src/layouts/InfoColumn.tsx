import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
  background-color: #f0f4f8;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const InfoColumn: React.FC = () => {
  return (
    <InfoContainer>
      インフォメーションエリア（将来実装）
    </InfoContainer>
  );
};

export default InfoColumn;
