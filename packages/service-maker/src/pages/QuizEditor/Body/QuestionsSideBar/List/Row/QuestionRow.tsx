import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import checkDataActive from 'utils/activeData';

const ItemType = 'QUESTION';

interface QuestionRowProps {
  index: number;
  questionId: string;
  title: string;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
}

function QuestionRow({
  index,
  questionId,
  title,
  moveQuestion,
}: QuestionRowProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuestionId = searchParams.get('questionId');

  const handleClick = useCallback(() => {
    setSearchParams({ questionId });
  }, [questionId, setSearchParams]);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <Container
      ref={ref}
      onClick={handleClick}
      data-active={checkDataActive(currentQuestionId === questionId)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
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
