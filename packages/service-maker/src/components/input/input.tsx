import { InputMakerInterface } from './input.interface';
import { MakerInputStyled } from './input.style';

export const InputMaker = ({ margin, register }: InputMakerInterface) => {
  return <MakerInputStyled margin={margin} {...register}></MakerInputStyled>;
};
