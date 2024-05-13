import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { QuestionModel } from 'services/api/out';
import styled from 'styled-components';

interface QuestionRowProps {
  index: number;
  questionId: string;
  title: QuestionModel['title'];
}

function QuestionRow({ index, questionId, title }: QuestionRowProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuestionId = searchParams.get('questionId');

  const handleClick = useCallback(() => {
    setSearchParams({ questionId });
  }, [questionId, setSearchParams]);

  return (
    <Container
      onClick={handleClick}
      selected={currentQuestionId === questionId}
    >
      <RowIndexBadge>{index + 1}</RowIndexBadge>
      <p>{title}</p>
    </Container>
  );
}

interface RowProps {
  selected: boolean;
}

const Container = styled.div<RowProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background: ${({ selected }) => (selected ? '#ebebeb' : 'white')};
  cursor: pointer;

  &:hover {
    background: #ebebeb;
  }
`;

const RowIndexBadge = styled.p`
  background: #c86597;
  width: 80px;
  text-align: end;
  border-radius: 2px;
  padding: 6px 8px;
`;

export default QuestionRow;
