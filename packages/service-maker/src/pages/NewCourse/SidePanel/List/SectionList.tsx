import useExtractSectionId from 'hooks/useExtractSectionId';
import SectionRow from 'pages/NewCourse/SidePanel/List/Row/SectionRow';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

import { Spinner, Text } from '@radix-ui/themes';

interface SectionListProps {
  courseId: string;
}

function SectionList({ courseId }: SectionListProps) {
  const { sectionId } = useExtractSectionId();
  const { data } = courseActions.useGetCourseSection({ id: courseId });

  return data && data.length ? (
    <Container>
      {data.map(({ id, title, description }, index) => (
        <SectionRow
          id={id}
          key={id}
          title={title}
          index={index + 1}
          description={description}
          isActive={sectionId === id}
        />
      ))}
    </Container>
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
