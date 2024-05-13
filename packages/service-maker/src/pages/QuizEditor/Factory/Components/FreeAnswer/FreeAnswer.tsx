import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';
import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';

function FreeAnswer({ questionId }: FactoryComponentInterface) {
  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <h1>Free answer</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export default FreeAnswer;
