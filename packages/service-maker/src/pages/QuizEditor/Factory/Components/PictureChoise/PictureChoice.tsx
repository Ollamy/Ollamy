import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import styled from 'styled-components';

function PictureChoice({}: FactoryComponentInterface) {
  return (
    <Container>
      <h1>picture choice</h1>
    </Container>
  );
}

const Container = styled.div``;

export default PictureChoice;
