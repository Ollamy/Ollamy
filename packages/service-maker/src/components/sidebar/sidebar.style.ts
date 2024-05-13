import type { SideBarMakerInterface } from 'components/sidebar/sidebar.interface';
import { styled } from 'styled-components';

const SideBarBaseWidth = '40%';
const SideBarBaseBackgroundColor =
  'linear-gradient(90deg, #E6674F 0%, #EB9281 100%);';

export const SideBarMakerStyled = styled.div<SideBarMakerInterface>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ width }) => width || `${SideBarBaseWidth}`};
  background: ${({ backgroundColor }) =>
    backgroundColor || `${SideBarBaseBackgroundColor}`};
`;
