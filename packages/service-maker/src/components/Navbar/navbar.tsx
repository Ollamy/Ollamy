import type { NavbarInterface } from 'components/Navbar/navbar.interface';

import { SubTitle } from 'components/Income/income.style';
import {
  NavLeftContainer,
  NavLeftContainerNameProps,
  NavLeftContainerNavigationProps,
  NavLeftContainerPercentageProps,
  NavOption,
  NewCourseButton,
  StatusBar,
  Title,
} from 'components/Navbar/navbar.style';

export function Navbar({ user, profilPercentage }: NavbarInterface) {
  return (
    <NavLeftContainer>
      <NavLeftContainerNameProps>
        <Title>{user}</Title>
        <NewCourseButton>New course</NewCourseButton>
      </NavLeftContainerNameProps>
      <NavLeftContainerPercentageProps>
        <Title>Profil {profilPercentage}%</Title>
        <StatusBar />
      </NavLeftContainerPercentageProps>
      <NavLeftContainerNavigationProps>
        <Title>Navigation</Title>
        <NavOption>
          <img src={'/assets/🦆 icon _pie chart_.svg'} alt="" />
          <SubTitle>Courses</SubTitle>
        </NavOption>
        <NavOption>
          <img src={'/assets/🦆 icon _people_.svg'} alt="" />
          <SubTitle>Subcriptions</SubTitle>
        </NavOption>
        <NavOption>
          <img src={'/assets/🦆 icon _flag_.svg'} alt="" />
          <SubTitle>Follower</SubTitle>
        </NavOption>
      </NavLeftContainerNavigationProps>
    </NavLeftContainer>
  );
}
