import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';

function MultipleChoice({ questionId }: FactoryComponentInterface) {
  return (
    <Container>
      <h1>multiple choice</h1>
    </Container>
  );
}

const Container = styled.div``;

export default MultipleChoice;
