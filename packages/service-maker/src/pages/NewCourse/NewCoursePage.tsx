import styled from 'styled-components';
import TopBar from 'components/TopBar/TopBar';
import { Skeleton, Text } from '@radix-ui/themes';
import CourseSidePanel from 'pages/NewCourse/SidePanel/CourseSidePanel';
import Section from 'pages/NewCourse/Section/Section';
import { useParams } from 'react-router-dom';
import useExtractSectionId from 'hooks/useExtractSectionId';

// eslint-disable-next-line
interface NewCoursePageProps {}

const NewCoursePage = ({}: NewCoursePageProps) => {
  const { courseId } = useParams();
  const { sectionId } = useExtractSectionId();

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
};

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

export default NewCoursePage;
