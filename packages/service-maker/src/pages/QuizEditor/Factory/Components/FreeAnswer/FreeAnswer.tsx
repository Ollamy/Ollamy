import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';

function FreeAnswer({ questionId }: FactoryComponentInterface) {
  return (
    <Container>
      <h1>Free answer</h1>
    </Container>
  );
}

const Container = styled.div``;

export default FreeAnswer;
