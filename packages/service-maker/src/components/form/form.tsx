import { FormMakerStyled } from 'components/form/form.style';

export function FormMaker({ children }: { children: any }) {
  return <FormMakerStyled>{children}</FormMakerStyled>;
}
