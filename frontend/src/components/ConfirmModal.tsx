import React from 'react';
import styled from 'styled-components';

interface ConfirmModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    margin-left: 10px;
  }
`;

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  message,
  onConfirm,
  onCancel,
  confirmText = '削除する',
  cancelText = 'キャンセル',
}) => {
  if (!visible) return null;

  return (
    <Overlay>
      <ModalBox>
        <p>{message}</p>
        <ButtonRow>
          <button onClick={onCancel}>{cancelText}</button>
          <button
            onClick={() => {
              console.log('✅ 削除ボタンがクリックされました');
              onConfirm();
            }}
          >
            {confirmText}
          </button>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default ConfirmModal;
