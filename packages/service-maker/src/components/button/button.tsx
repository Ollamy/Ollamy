import { ButtonMakerStyled } from 'components/button/button.style';

interface ButtonMakerProps {
  textButton: string;
  onClick?: any;
}

export function ButtonMaker({
  textButton,
  onClick,
}: ButtonMakerProps): JSX.Element {
  return <ButtonMakerStyled onClick={onClick}>{textButton}</ButtonMakerStyled>;
}
