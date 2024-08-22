import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import checkDataActive from 'utils/activeData';

import { Text, Tooltip } from '@radix-ui/themes';

const ItemType = 'SECTION';

interface SectionRowProps {
  id: string;
  index: number;
  isActive: boolean;
  title: string;
  description: string;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
}

function SectionRow({
  id,
  index,
  isActive,
  title,
  description,
  moveSection,
}: SectionRowProps) {
  const [, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    setSearchParams({ sectionId: id });
  }, [id, setSearchParams]);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
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

      moveSection(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <Tooltip content={description}>
      <Container
        ref={ref}
        data-active={checkDataActive(isActive)}
        onClick={handleClick}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <Index>{index}</Index>
        <Title>{title}</Title>
      </Container>
    </Tooltip>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  min-height: 40px;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  &[data-active] {
    color: white;
    font-weight: 600;
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
  height: 100%;
  aspect-ratio: 1 / 1;
  font-size: 12px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Title = styled(Text)``;

export default SectionRow;
