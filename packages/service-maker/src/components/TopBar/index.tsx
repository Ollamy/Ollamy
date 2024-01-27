import styled from 'styled-components';
import { ReactElement } from 'react';

interface TopBarProps {
  title: string;
  children?: ReactElement;
  profilePictureDisplayed?: boolean;
}

const TopBar = ({ title, children, profilePictureDisplayed = true }: TopBarProps): ReactElement => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
      {profilePictureDisplayed && <ProfilePicture href={'/profile'}>N</ProfilePicture>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 50px;
  padding: 8px;
  box-sizing: border-box;

  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    rgba(0, 0, 0, 0.15) 0 0.5px 0,
    rgba(0, 0, 0, 0.05) 0 -0.5px 0 inset;
`;

const Title = styled.h3`
  color: #3d3d3d;
`;

const ProfilePicture = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 100%;
  border-radius: 100%;

  color: white;
  text-decoration: none;
  background: rgb(136, 106, 246);
  box-shadow:
    rgba(0, 0, 0, 0.15) 0 0.5px 0,
    rgba(0, 0, 0, 0.05) 0 -0.5px 0 inset;
  background: linear-gradient(
    118deg,
    rgba(136, 106, 246, 1) 0%,
    rgba(252, 151, 187, 1) 68%,
    rgba(252, 151, 187, 1) 100%
  );

  cursor: pointer;
`;

export default TopBar;
