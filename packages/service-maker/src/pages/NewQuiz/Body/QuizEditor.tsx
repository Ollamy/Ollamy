import { useParams } from 'react-router-dom';
import QuestionEditor from 'pages/NewQuiz/Body/QuestionEditor/QuestionEditor';
import QuestionsPropertiesSideBar from 'pages/NewQuiz/Body/QuestionPropertiesSideBar/QuestionsPropertiesSideBar';
import QuestionsSideBar from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBar';
import styled from 'styled-components';

interface QuizEditorProps {
  lessonId: string;
}

export type QuizID = string;

function QuizEditor({ lessonId }: QuizEditorProps) {
  const { questionId } = useParams();

  return (
    <Container>
      <QuestionsSideBar lessonId={lessonId} />
      {questionId && (
        <QuestionEditor lessonId={lessonId} questionId={questionId} />
      )}
      <QuestionsPropertiesSideBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export default QuizEditor;
