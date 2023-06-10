import { styled } from 'styled-components';
import { SideBarMakerInterface } from './sidebar.interface';

const SideBarBaseWidth = '40%';
const SideBarBaseBackgroundColor = 'linear-gradient(90deg, #E6674F 0%, #EB9281 100%);';

export const SideBarMakerStyled = styled.div<SideBarMakerInterface>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${(props) => (props.width ? props.width : `${SideBarBaseWidth}`)};
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : `${SideBarBaseBackgroundColor}`)};
`;
