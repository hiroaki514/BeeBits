// frontend/src/layouts/AppLayout.tsx
import React from 'react';
import styled from 'styled-components';
import MenuColumn from './MenuColumn';
import TimelineColumn from './TimelineColumn';
import InfoColumn from './InfoColumn';

const LayoutContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f8fa;
  overflow: hidden;
  gap: 3px;
`;

const ColumnWrapper = styled.div<{ width: string }>`
  flex: 0 0 ${(props) => props.width};
  padding: 10px;
  box-sizing: border-box;
`;

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <ColumnWrapper width="20%">
        <MenuColumn />
      </ColumnWrapper>
      <ColumnWrapper width="60%">
        <TimelineColumn>{children}</TimelineColumn>
      </ColumnWrapper>
      <ColumnWrapper width="20%">
        <InfoColumn />
      </ColumnWrapper>
    </LayoutContainer>
  );
};

export default AppLayout;
