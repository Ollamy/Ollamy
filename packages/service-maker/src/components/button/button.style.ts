import { styled } from 'styled-components';
import { ButtonMakerInterface } from 'src/components/button/button.interface';

const ButtonMakerBaseBackgroundColor = 'linear-gradient(180deg, #EA978B 0%, #EF644A 100%)';

export const ButtonMakerStyled = styled.button<ButtonMakerInterface>`
  height: 50px;
  width: 480px;
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : `${ButtonMakerBaseBackgroundColor}`)};
  padding: 12px;
  text-align: center;
  align-items: center;
  border-radius: 12px;
  border: none;
  color: white;
  cursor: pointer;
`;
