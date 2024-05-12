import useExtractSectionId from 'hooks/useExtractSectionId';
import type { CustomCourseSectionModel } from 'pages/NewCourse/SidePanel/CourseSidePanel';
import SectionRow from 'pages/NewCourse/SidePanel/List/Row/SectionRow';
import styled from 'styled-components';

import { Spinner, Text } from '@radix-ui/themes';

interface SectionListProps {
  data?: CustomCourseSectionModel[];
}

function SectionList({ data }: SectionListProps) {
  const { sectionId } = useExtractSectionId();

  return data && data.length ? (
    <Container>
      {data.map(({ id, title, description, realIndex }, index) => (
        <SectionRow
          id={id}
          key={id}
          title={title}
          index={(realIndex || index) + 1}
          description={description}
          isActive={sectionId === id}
        />
      ))}
    </Container>
  ) : data && !data.length ? (
    <LoadingContainer>
      <Text>No results or sections…</Text>
    </LoadingContainer>
  ) : (
    <LoadingContainer>
      <Spinner />
      <Text>Loading…</Text>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--gray-11);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  gap: 8px;

  overflow: scroll;
`;

export default SectionList;
