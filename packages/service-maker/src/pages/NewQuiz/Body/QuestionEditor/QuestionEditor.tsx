import quizFactory from 'pages/NewQuiz/Factory/factory';
import { QuestionType } from 'pages/NewQuiz/Factory/factory.types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// eslint-disable-next-line
interface QuestionEditorProps {}

const QuestionEditor = ({}: QuestionEditorProps) => {
  const { questionId } = useParams();

  const questionData = {
    id: 'f5780185-2d4c-497e-9c78-fa3cea5270aa',
    lessonId: 'string',
    title: 'Hello',
    description: 'Hello world....',
    typeAnswer: 'TEXT',
    typeQuestion: 'TEXT',
    trustAnswerId: 'string',
    pictureId: 'string',
    difficulty: 'INTERMEDIATE',
    order: 'a0',
    points: 1,
  };

  if (!questionId) return null;

  return (
    <Center>
      <Container>
        <h3>Question {questionId}</h3>
        {quizFactory[questionData.typeQuestion as QuestionType].Component}
      </Container>
    </Center>
  );
};

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  width: 480px;
  height: 100%;
  padding: 16px;

  background: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 2px;
`;

export default QuestionEditor;
