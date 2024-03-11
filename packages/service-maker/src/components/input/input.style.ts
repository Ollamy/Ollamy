import styled from "styled-components";

import type { InputMakerInterface } from "./input.interface";

const BaseBorderInputColorMaker = "#876BF6";

export const MakerInputStyled = styled.input<InputMakerInterface>`
  padding: ${(props) => (props.padding ? props.padding : "12px")};
  height: 30px;
  width: 480px;
  border: 2px solid ${BaseBorderInputColorMaker};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(135, 107, 246, 0.5);
  margin: ${(props) => (props.margin ? props.margin : "0px 0px 0px 0px")};
`;
