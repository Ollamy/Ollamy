import { useSearchParams } from 'react-router-dom';
import QuestionEditor from 'pages/QuizEditor/Body/QuestionEditor/QuestionEditor';
import QuestionsPropertiesSideBar from 'pages/QuizEditor/Body/QuestionPropertiesSideBar/QuestionsPropertiesSideBar';
import QuestionsSideBar from 'pages/QuizEditor/Body/QuestionsSideBar/QuestionSideBar';
import styled from 'styled-components';

interface QuizEditorProps {
  lessonId: string;
}

function QuizEditor({ lessonId }: QuizEditorProps) {
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get('questionId');

  return (
    <Container>
      <QuestionsSideBar lessonId={lessonId} />
      {questionId && (
        <>
          <Center>
            <QuestionEditor questionId={questionId} />
          </Center>
          <QuestionsPropertiesSideBar questionId={questionId} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100%;
  min-height: 100%;
  flex: 1;
`;

export default QuizEditor;
