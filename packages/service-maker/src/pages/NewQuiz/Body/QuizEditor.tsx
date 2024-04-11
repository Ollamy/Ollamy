import styled from 'styled-components';
import QuestionsSideBar from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBar';
import QuestionEditor from 'pages/NewQuiz/Body/QuestionEditor/QuestionEditor';
import QuestionsPropertiesSideBar from 'pages/NewQuiz/Body/QuestionPropertiesSideBar/QuestionsPropertiesSideBar';

// eslint-disable-next-line
interface QuizEditorProps {}

const QuizEditor = ({}: QuizEditorProps) => {
  return (
    <Container>
      <QuestionsSideBar />
      <QuestionEditor />
      <QuestionsPropertiesSideBar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export default QuizEditor;
