import { useParams, useSearchParams } from 'react-router-dom';
import TopBar from 'components/TopBar/TopBar';
import Section from 'pages/CourseManager/Section/Section';
import CourseSidePanel from 'pages/CourseManager/SidePanel/CourseSidePanel';
import styled from 'styled-components';

import { Text } from '@radix-ui/themes';

function CourseManagerPage() {
  const { courseId } = useParams();

  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('sectionId');

  return courseId ? (
    <Container>
      <TopBar />
      <Body>
        <CourseSidePanel courseId={courseId} />
        {sectionId && <Section sectionId={sectionId} />}
      </Body>
    </Container>
  ) : (
    <Text>Loading...</Text>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

const Body = styled.div`
  display: flex;

  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

export default CourseManagerPage;
