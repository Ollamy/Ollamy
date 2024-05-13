import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { QuestionModel } from 'services/api/out';
import styled from 'styled-components';
import checkDataActive from 'utils/activeData';

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
      data-active={checkDataActive(currentQuestionId === questionId)}
    >
      <Index>{index + 1}</Index>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;

  width: 100%;
  min-height: 40px;
  border-radius: 4px;

  padding: 10px;
  box-sizing: border-box;

  &[data-active] {
    color: white;
    background-color: var(--orange-9);

    &:hover {
      background-color: var(--orange-9);
    }
  }

  &:hover {
    background-color: var(--gray-3);
  }

  cursor: pointer;
`;

const Index = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 24px;
  aspect-ratio: 1 / 1;

  font-size: 12px;
  border-radius: 2px;

  background-color: rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  height: 100%;
  margin: 0;
`;

export default QuestionRow;
