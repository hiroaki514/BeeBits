// frontend/src/layouts/AppLayout.tsx
import React from 'react';
import styled from 'styled-components';
import MenuColumn from './MenuColumn';
import TimelineColumn from './TimelineColumn';
import InfoColumn from './InfoColumn';

const LayoutContainer = styled.div`
  display: flex;
  min-width: 768px;
  width: 100%;
  height: 100vh;
  background-color: #f5f8fa;
  overflow-x: hidden;
`;

const MenuColumnWrapper = styled.div`
  flex: 0 0 20%;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex: 0 0 60px; /* アイコン表示幅 */
    padding: 5px;
  }

  @media (max-width: 768px) {
    display: none; /* 完全非表示 */
  }
`;

const TimelineWrapper = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  overflow: visible; /* 独立スクロール禁止 */
`;

const InfoColumnWrapper = styled.div`
  flex: 0 0 20%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 100vh;

  @media (max-width: 1024px) {
    display: none; /* 小画面では非表示 */
  }
`;

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <MenuColumnWrapper>
        <MenuColumn />
      </MenuColumnWrapper>

      <TimelineWrapper>
        <TimelineColumn>{children}</TimelineColumn>
      </TimelineWrapper>

      <InfoColumnWrapper>
        <InfoColumn />
      </InfoColumnWrapper>
    </LayoutContainer>
  );
};

export default AppLayout;
