import type { ReactElement } from "react";
import { useState } from "react";
import styled from "styled-components";

import profile from "../../assets/profile.png";
import { CoursePicture } from "../../components/Course/Picture/course.picture";
import { Navbar } from "../../components/Navbar/navbar";
import { ProfileInfo } from "../../components/profile/profile";
import TopBar from "../../components/TopBar";

export function ProfilePage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profilPercentage, setProfilePercentage] = useState<number>(45);

  return (
    <Container>
      <TopBar title="Profile">
        <img src={profile} alt="profile pic" height="90%" />
      </TopBar>
      <Body>
        <Navbar user="Alexandre Garage" profilPercentage={profilPercentage} />
        <RightContainerCourseSettings>
          <RightContainerTopCourseSettings>
            <RightContainerSetting $width="1040px">
              <ProfileInfo
                title="Your Profile"
                subTitleCourse="First name"
                subTitleInfo="Last name"
                subTitlePrice="Email"
              />
            </RightContainerSetting>
          </RightContainerTopCourseSettings>
          <RightContainerTopCourseSettings>
            <CoursePicture
              title="Profile picture"
              width="600px"
              height="340px"
            />
            <RightContainerSetting $width="100%">
              <Title>Subcriptions</Title>
              <Title>90,420</Title>
            </RightContainerSetting>
          </RightContainerTopCourseSettings>
        </RightContainerCourseSettings>
      </Body>
    </Container>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 70px;

  height: 100%;
  width: 100%;
`;

const RightContainerCourseSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f3f6;
`;

const RightContainerTopCourseSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const RightContainerSetting = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => props.$width};
  border-radius: 8px;
  height: 340px;
  margin: 24px;
  padding: 12px;
  gap: 40px;
  background-color: #ffffff;
`;

const Container = styled.div`
  display: block;

  width: 100vw;
  height: 100vh;
`;

const Title = styled.h2`
  margin: 0;
  color: #556080;
`;
