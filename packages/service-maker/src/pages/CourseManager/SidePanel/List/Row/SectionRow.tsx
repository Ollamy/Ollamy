import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { GetSectionsModel } from 'services/api/out';
import styled from 'styled-components';
import checkDataActive from 'utils/activeData';

import { Text, Tooltip } from '@radix-ui/themes';

interface SectionRowProps {
  id: string;
  index: number;
  isActive: boolean;
  title: GetSectionsModel['title'];
  description: GetSectionsModel['description'];
}

function SectionRow({
  id,
  index,
  isActive,
  title,
  description,
}: SectionRowProps) {
  const [, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    setSearchParams({ sectionId: id });
  }, [id, setSearchParams]);

  return (
    <Tooltip content={description}>
      <Container data-active={checkDataActive(isActive)} onClick={handleClick}>
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

  height: 30px;
  aspect-ratio: 1 / 1;

  font-size: 12px;
  border-radius: 2px;

  background-color: rgba(0, 0, 0, 0.1);
`;

const Title = styled(Text)``;

export default SectionRow;
