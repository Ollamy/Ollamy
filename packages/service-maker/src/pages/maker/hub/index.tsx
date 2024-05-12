import type { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from 'components/loading/spinner';
import TopBar from 'components/TopBar';
import LessonEdit from 'pages/maker/hub/lessonEdit';
import SectionEdit from 'pages/maker/hub/sectionEdit';
import SideBarMenu from 'pages/maker/hub/sideBarMenu';
import api from 'services/api';
import styled from 'styled-components';

function MakerHubPage(): ReactElement {
  const navigate = useNavigate();

  const { id, sectionId, lessonId } = useParams();
  if (!id) {
    navigate('/home');
    return <></>;
  }

  const { data: course } = api.course.useCourse({ id });
  const { data: section } = api.section.useSection(
    { id: sectionId ?? '' },
    { enabled: sectionId !== undefined }
  );
  const { data: lesson } = api.lesson.useLesson(
    { id: lessonId ?? '' },
    { enabled: lessonId !== undefined }
  );

  if (!course)
    return (
      <Container>
        <TopBar title={'Ollamy Maker'} />
        <LoadingComponent />
      </Container>
    );

  return (
    <Container>
      <TopBar title={'Ollamy Maker'} />
      <Body>
        <SideBarMenu
          course={course}
          sectionId={sectionId}
          lessonId={lessonId}
        />
        <LeftContainer>
          {section && <SectionEdit section={section} />}
          {lesson && <LessonEdit lesson={lesson} />}
        </LeftContainer>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  gap: 32px;

  background: #f1f3f6;
`;

const Body = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;
  gap: 64px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 68px;
  gap: 64px;
`;

export default MakerHubPage;
