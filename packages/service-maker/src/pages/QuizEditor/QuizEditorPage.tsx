import { useParams } from 'react-router-dom';
import TopBar from 'components/TopBar/TopBar';
import QuizEditor from 'pages/QuizEditor/Body/QuizEditor';
import styled from 'styled-components';

function QuizEditorPage() {
  const { lessonId } = useParams();

  return lessonId ? (
    <Container>
      <TopBar />
      <QuizEditor lessonId={lessonId} />
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

export default QuizEditorPage;
