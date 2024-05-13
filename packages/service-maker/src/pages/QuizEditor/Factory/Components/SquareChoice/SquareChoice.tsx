import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';
import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';

function SquareChoice({ questionId }: FactoryComponentInterface) {
  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <h1>Square choice</h1>
    </Container>
  );
}

const Container = styled.div``;

export default SquareChoice;
