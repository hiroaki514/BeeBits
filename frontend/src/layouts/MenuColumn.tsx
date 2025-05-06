// frontend/src/layouts/MenuColumn.tsx
import React from 'react';
import styled from 'styled-components';
import { FaHome, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: #f0f4f8;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  box-sizing: border-box;
  z-index: 1000;

  @media (max-width: 1024px) {
    width: 60px;          /* ✅ 狭幅化 */
    align-items: center;  /* ✅ 中央寄せ維持 */
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e1eaf1;
  }

  @media (max-width: 1024px) {
    gap: 0;
    justify-content: center;

    span {
      display: none; /* ✅ ラベル非表示 */
    }
  }
`;

const MenuColumn: React.FC = () => {
  return (
    <MenuContainer>
      <MenuItem><FaHome /><span>ホーム</span></MenuItem>
      <MenuItem><FaSearch /><span>検索</span></MenuItem>
      <MenuItem><FaBell /><span>通知</span></MenuItem>
      <MenuItem><FaEnvelope /><span>メッセージ</span></MenuItem>
    </MenuContainer>
  );
};

export default MenuColumn;
