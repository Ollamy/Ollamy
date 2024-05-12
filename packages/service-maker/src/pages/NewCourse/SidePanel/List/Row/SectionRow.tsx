import styled from 'styled-components';
import { Text, Tooltip } from '@radix-ui/themes';
import { CourseSectionModel } from 'services/api/out';
import checkDataActive from 'utils/activeData';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SectionRowProps {
  id: string;
  index: number;
  isActive: boolean;
  title: CourseSectionModel['title'];
  description: CourseSectionModel['description'];
}

const SectionRow = ({
  id,
  index,
  isActive,
  title,
  description,
}: SectionRowProps) => {
  const [_, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    setSearchParams({ sectionId: id });
  }, []);

  return (
    <Tooltip content={description}>
      <Container data-active={checkDataActive(isActive)} onClick={handleClick}>
        <Index>{index}</Index>
        <Title>{title}</Title>
      </Container>
    </Tooltip>
  );
};

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
