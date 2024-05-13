import { useParams } from 'react-router-dom';
import TopBar from 'components/TopBar/TopBar';
import LectureEditor from 'pages/LectureEditor/Editor/LectueEditor';
import styled from 'styled-components';

function LectureEditorPage() {
  const { lessonId } = useParams();

  return lessonId ? (
    <Container>
      <TopBar />
      <SubContainer>
        {lessonId && <LectureEditor lessonId={lessonId} />}
      </SubContainer>
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export default LectureEditorPage;
