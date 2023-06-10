import { InputMakerInterface } from './input.interface';
import { MakerInputStyled } from './input.style';

export const InputMaker = ({ margin }: InputMakerInterface) => {
  return <MakerInputStyled margin={margin}></MakerInputStyled>;
};
