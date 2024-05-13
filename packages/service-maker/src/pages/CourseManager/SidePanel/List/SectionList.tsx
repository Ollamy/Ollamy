import { useSearchParams } from 'react-router-dom';
import type { CustomCourseSectionModel } from 'pages/CourseManager/SidePanel/CourseSidePanel';
import SectionRow from 'pages/CourseManager/SidePanel/List/Row/SectionRow';
import styled from 'styled-components';

import { Spinner, Text } from '@radix-ui/themes';

interface SectionListProps {
  data?: CustomCourseSectionModel[];
}

function SectionList({ data }: SectionListProps) {
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');

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
