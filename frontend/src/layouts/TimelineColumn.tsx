// frontend/src/layouts/TimelineColumn.tsx
import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const InnerContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  box-sizing: border-box;

  /* スクロールバーのスタイルを必要に応じて追加 */
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const TimelineColumn: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <TimelineContainer>
      <InnerContainer>{children}</InnerContainer>
    </TimelineContainer>
  );
};

export default TimelineColumn;
