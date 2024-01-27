import { FormMakerStyled } from 'src/components/form/form.style';

export const FormMaker = ({ children }: { children: any }) => {
  return <FormMakerStyled>{children}</FormMakerStyled>;
};
