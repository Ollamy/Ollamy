import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';
import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';

function MultipleChoice({ questionId }: FactoryComponentInterface) {
  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <h1>multiple choice</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export default MultipleChoice;
