import styled from 'styled-components';
import QuestionsSideBar from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBar';
import QuestionEditor from 'pages/NewQuiz/Body/QuestionEditor/QuestionEditor';
import QuestionsPropertiesSideBar from 'pages/NewQuiz/Body/QuestionPropertiesSideBar/QuestionsPropertiesSideBar';
import { useParams } from 'react-router-dom';

interface QuizEditorProps {
  lessonId: string;
}

export type QuizID = string;

const QuizEditor = ({ lessonId }: QuizEditorProps) => {
  const { questionId } = useParams();

  return (
    <Container>
      <QuestionsSideBar lessonId={lessonId} />
      {questionId && <QuestionEditor questionId={questionId} />}
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
