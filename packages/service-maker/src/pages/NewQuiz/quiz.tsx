import { useParams } from 'react-router-dom';
import QuizEditor from 'pages/NewQuiz/Body/QuizEditor';
import TopBar from 'components/TopBar/TopBar';
import styled from 'styled-components';

// eslint-disable-next-line
interface NewQuizProps {}

function NewQuiz({}: NewQuizProps) {
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

  width: 100vw;
  height: 100vh;
  background: #fafafa;
`;

export default NewQuiz;
