import styled from 'styled-components';
import TopBar from 'pages/NewQuiz/Header/TopBar';
import QuizEditor from 'pages/NewQuiz/Body/QuizEditor';

// eslint-disable-next-line
interface NewQuizProps {}

const NewQuiz = ({}: NewQuizProps) => {
  return (
    <Container>
      <TopBar />
      <QuizEditor />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  background: #fafafa;
`;

export default NewQuiz;
