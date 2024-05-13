import { SideBarMakerStyled } from 'components/sidebar/sidebar.style';

export function SideBarMaker({ children }: { children: any }) {
  return <SideBarMakerStyled>{children}</SideBarMakerStyled>;
}
