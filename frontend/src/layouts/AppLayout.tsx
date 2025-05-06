// frontend/src/layouts/AppLayout.tsx
import React from 'react';
import styled from 'styled-components';
import MenuColumn from './MenuColumn';
import TimelineColumn from './TimelineColumn';
import InfoColumn from './InfoColumn';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f8fa;
  overflow: visible;
`;

const MenuColumnWrapper = styled.div`
  flex: 0 0 240px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex: 0 0 60px;
  }
`;

const TimelineWrapper = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  height: auto;
  overflow: visible;
`;

const InfoColumnWrapper = styled.div`
  flex: 0 0 20%;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <MenuColumnWrapper />
      <MenuColumn />

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
