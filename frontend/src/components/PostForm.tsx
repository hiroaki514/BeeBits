import React, { useState } from 'react';
import styled from 'styled-components';

const MAX_CONTENT_LENGTH = 140;

const Container = styled.div`
  margin: 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
`;

const Counter = styled.div<{ overLimit: boolean }>`
  font-size: 12px;
  color: ${({ overLimit }) => (overLimit ? 'red' : '#666')};
`;

const Button = styled.button`
  padding: 6px 12px;
`;

interface Props {
  onSubmit: (content: string) => void;
  initialValue?: string;
  placeholder?: string;
  submitLabel?: string;
  disabled?: boolean;
}

const PostForm: React.FC<Props> = ({
  onSubmit,
  initialValue = '',
  placeholder = '投稿内容を入力...',
  submitLabel = '投稿する',
  disabled = false,
}) => {
  const [content, setContent] = useState(initialValue);

  const overLimit = content.length > MAX_CONTENT_LENGTH;
  const isEmpty = content.trim() === '';

  const handleSubmit = () => {
    if (!isEmpty && !overLimit) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Container>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
      />
      <Counter overLimit={overLimit}>
        {content.length} / {MAX_CONTENT_LENGTH}
      </Counter>
      <Button onClick={handleSubmit} disabled={disabled || isEmpty || overLimit}>
        {submitLabel}
      </Button>
    </Container>
  );
};

export default PostForm;
