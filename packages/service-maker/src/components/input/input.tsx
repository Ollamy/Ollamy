import { InputMakerInterface } from 'src/components/input/input.interface';
import { MakerInputStyled } from 'src/components/input/input.style';
import styled from 'styled-components';
import { ReactElement } from 'react';

const InputMaker = ({ margin, register, type, errorMessage }: InputMakerInterface): ReactElement => {
  return (
    <Container>
      <MakerInputStyled margin={margin} {...register} type={type} />
      {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
`;

const ErrorContainer = styled.div`
  color: red;
`;

export default InputMaker;
