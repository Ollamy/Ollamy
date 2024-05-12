import styled from 'styled-components';
import { useEffect } from 'react';
import TopBar from 'components/TopBar/TopBar';
import CourseSidePanel from 'pages/NewCourse/SidePanel/CourseSidePanel';
import Section from 'pages/NewCourse/Section/Section';
import { useParams } from 'react-router-dom';
import { Text } from '@radix-ui/themes';
import useExtractSectionAndLessonIds from 'hooks/useExtractSectionAndLessonIds';

// eslint-disable-next-line
interface NewCoursePageProps {}

const NewCoursePage = ({}: NewCoursePageProps) => {
  const { courseId } = useParams();
  const { lessonId, sectionId } = useExtractSectionAndLessonIds();

  useEffect(() => {
    console.log(sectionId, lessonId);
  }, [lessonId, sectionId]);

  return courseId ? (
    <Container>
      <TopBar />
      <Body>
        <CourseSidePanel courseId={courseId} />
        <Section />
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
