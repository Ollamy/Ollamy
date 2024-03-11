import { FormMakerStyled } from "./form.style";

export function FormMaker({ children }: { children: any }) {
  return <FormMakerStyled>{children}</FormMakerStyled>;
}
