// frontend/src/layouts/TimelineColumn.tsx
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  min-height: 100%;
`;

const TimelineColumn: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default TimelineColumn;
