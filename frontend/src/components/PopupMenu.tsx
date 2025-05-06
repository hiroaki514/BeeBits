import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PopupMenuProps {
  isOwnPost: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const MenuContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  border-radius: 6px;
  padding: 8px 0;
  z-index: 1000;
  width: 160px;
`;

const MenuItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const PopupMenu: React.FC<PopupMenuProps> = ({ isOwnPost, onClose, onDelete }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <MenuContainer ref={menuRef}>
      {isOwnPost ? (
        <>
          <MenuItem>プロフィールに固定</MenuItem>
          <MenuItem>返信できるユーザーを変更</MenuItem>
          {onDelete && <MenuItem onClick={onDelete}>投稿を削除</MenuItem>}
        </>
      ) : (
        <MenuItem>この投稿を通報</MenuItem>
      )}
    </MenuContainer>
  );
};

export default PopupMenu;
