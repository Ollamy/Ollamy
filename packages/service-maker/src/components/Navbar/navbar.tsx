import flag from "../../assets/🦆 icon _flag_.svg";
import people from "../../assets/🦆 icon _people_.svg";
import pie from "../../assets/🦆 icon _pie chart_.svg";

import type { NavbarInterface } from "./navbar.interface";

import {
  NavLeftContainer,
  NavLeftContainerNameProps,
  NavLeftContainerNavigationProps,
  NavLeftContainerPercentageProps,
  NavOption,
  NewCourseButton,
  StatusBar,
  SubTitle,
  Title,
} from "./navbar.style";

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
          <img src={pie} alt="" />
          <SubTitle>Courses</SubTitle>
        </NavOption>
        <NavOption>
          <img src={people} alt="" />
          <SubTitle>Subcriptions</SubTitle>
        </NavOption>
        <NavOption>
          <img src={flag} alt="" />
          <SubTitle>Follower</SubTitle>
        </NavOption>
      </NavLeftContainerNavigationProps>
    </NavLeftContainer>
  );
}
