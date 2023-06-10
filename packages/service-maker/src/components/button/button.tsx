import { ButtonMakerStyled } from './button.style';

interface ButtonMakerProps {
  textButton: string;
  onClick?: any;
}

export const ButtonMaker = ({ textButton, onClick }: ButtonMakerProps) => {
  return <ButtonMakerStyled onClick={onClick}>{textButton}</ButtonMakerStyled>;
};
