import React from 'react';
import styled from 'styled-components';
import MenuColumn from './MenuColumn';
import TimelineColumn from './TimelineColumn';
import InfoColumn from './InfoColumn';

const LayoutContainer = styled.div`
  display: flex;
  min-width: 768px;
  width: 100%;
  background-color: #f5f8fa;
  overflow: visible; /* ✅ 全体スクロールを許可（中央にバーが出ない） */
`;

const MenuColumnWrapper = styled.div`
  flex: 0 0 20%;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex: 0 0 60px;
    padding: 5px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineWrapper = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  height: auto;        /* ✅ 高さ制限を解除 */
  overflow: visible;   /* ✅ 中央にスクロールバーを出さない */
`;

const InfoColumnWrapper = styled.div`
  flex: 0 0 20%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;    /* ✅ 情報カラムだけスクロール可能にする */
  max-height: 100vh;

  @media (max-width: 1024px) {
    display: none;
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
