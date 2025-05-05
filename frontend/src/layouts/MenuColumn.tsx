// frontend/src/layouts/MenuColumn.tsx
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const Placeholder = styled.div`
  font-size: 14px;
  color: #666;
`;

const MenuColumn: React.FC = () => {
  return (
    <Wrapper>
      <Placeholder>メニューエリア（将来実装）</Placeholder>
    </Wrapper>
  );
};

export default MenuColumn;
