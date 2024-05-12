import SectionCreator from 'pages/NewCourse/SidePanel/Creator/SectionCreator';
import SectionSearchBar from 'pages/NewCourse/SidePanel/SearchBar/SectionSearchBar';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

interface CourseSidePanelProps {
  courseId: string;
}

function CourseSidePanel({ courseId }: CourseSidePanelProps) {
  const { data } = courseActions.useGetCourseSection({ id: courseId });

  return (
    <Container>
      <SectionSearchBar />
      <SectionCreator courseId={courseId} />
      {data && data.length && data.map((elem) => <p>{elem.title}</p>)}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: #fff;
  border: 1px solid #e7e7e7;

  padding: 20px;
  box-sizing: border-box;

  height: 100%;
  width: 300px;
`;

export default CourseSidePanel;
