import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';

function SquareChoice({ questionId }: FactoryComponentInterface) {
  return (
    <Container>
      <h1>Square choice</h1>
    </Container>
  );
}

const Container = styled.div``;

export default SquareChoice;
