import { SideBarMakerStyled } from 'src/components/sidebar/sidebar.style';

export const SideBarMaker = ({ children }: { children: any }) => {
  return <SideBarMakerStyled>{children}</SideBarMakerStyled>;
};
