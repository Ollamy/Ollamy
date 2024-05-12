import { InputMakerInterface } from 'components/input/input.interface';
import { MakerInputStyled } from 'components/input/input.style';
import styled from 'styled-components';

export function InputMaker({
  margin,
  register,
  type,
  errorMessage,
  padding,
}: InputMakerInterface) {
  return (
    <Container>
      <MakerInputStyled
        margin={margin}
        {...register}
        type={type}
        padding={padding}
      />
      {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
`;

const ErrorContainer = styled.div`
  color: red;
`;
