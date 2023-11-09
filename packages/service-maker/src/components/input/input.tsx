/* eslint-disable react/jsx-props-no-spreading */
import type { InputMakerInterface } from './input.interface';

import { MakerInputStyled } from './input.style';

export function InputMaker({ margin, register, type }: InputMakerInterface): React.ReactNode {
  return <MakerInputStyled margin={margin} {...register} type={type} />;
}
