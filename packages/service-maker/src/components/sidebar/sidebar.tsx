import { SideBarMakerStyled } from './sidebar.style';

export const SideBarMaker = ({ children }: { children: any }) => {
  return <SideBarMakerStyled>{children}</SideBarMakerStyled>;
};
