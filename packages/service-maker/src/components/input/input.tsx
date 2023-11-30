/* eslint-disable react/jsx-props-no-spreading */
import styled from "styled-components";

import type { InputMakerInterface } from "./input.interface";

import { MakerInputStyled } from "./input.style";

export function InputMaker({
  margin,
  register,
  type,
  errorMessage,
}: InputMakerInterface): React.ReactNode {
  return (
    <Container>
      <MakerInputStyled margin={margin} {...register} type={type} />
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
