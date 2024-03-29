import { styled } from "styled-components";

import type { FormMakerInterface } from "./form.interface";

export const FormMakerStyled = styled.div<FormMakerInterface>`
  display: flex;
  width: 60%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
`;
