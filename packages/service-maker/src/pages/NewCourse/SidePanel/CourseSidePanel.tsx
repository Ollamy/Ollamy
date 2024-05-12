import SectionCreator from 'pages/NewCourse/SidePanel/Creator/SectionCreator';
import SectionList from 'pages/NewCourse/SidePanel/List/SectionList';
import SectionSearchBar from 'pages/NewCourse/SidePanel/SearchBar/SectionSearchBar';
import styled from 'styled-components';

interface CourseSidePanelProps {
  courseId: string;
}

function CourseSidePanel({ courseId }: CourseSidePanelProps) {
  return (
    <Container>
      <SectionSearchBar />
      <SectionCreator courseId={courseId} />
      <SectionList courseId={courseId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;

  background: #fff;
  border: 1px solid #e7e7e7;

  padding: 20px 0;
  box-sizing: border-box;

  max-height: 100%;
  min-width: 300px;

  > * {
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export default CourseSidePanel;
