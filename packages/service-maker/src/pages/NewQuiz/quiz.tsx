import styled from 'styled-components';
import TopBar from 'pages/NewQuiz/Header/TopBar';
import QuizEditor from 'pages/NewQuiz/Body/QuizEditor';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line
interface NewQuizProps {}

const NewQuiz = ({}: NewQuizProps) => {
  const { lessonId } = useParams();

  return lessonId ? (
    <Container>
      <TopBar />
      <QuizEditor lessonId={lessonId} />
    </Container>
  ) : null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  background: #fafafa;
`;

export default NewQuiz;
