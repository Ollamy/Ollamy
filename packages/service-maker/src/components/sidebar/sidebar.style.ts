import { styled } from 'styled-components';
import { SideBarMakerInterface } from 'components/sidebar/sidebar.interface';

const SideBarBaseWidth = '40%';
const SideBarBaseBackgroundColor =
  'linear-gradient(90deg, #E6674F 0%, #EB9281 100%);';

export const SideBarMakerStyled = styled.div<SideBarMakerInterface>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ width }) => (width ? width : `${SideBarBaseWidth}`)};
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : `${SideBarBaseBackgroundColor}`};
`;
