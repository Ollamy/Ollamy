import type { ReactElement } from "react";
import { useState } from "react";
import type { GetCourseRequest } from "services/api/out";
import styled from "styled-components";

import profile from "../../../assets/profile.png";
import { CarrouselMaker } from "../../../components/Carrousel/carrousel";
import { CoursePicture } from "../../../components/Course/Picture/course.picture";
import { CourseSetting } from "../../../components/Course/Setting/course.setting";
import { Navbar } from "../../../components/Navbar/navbar";
import TopBar from "../../../components/TopBar";
// eslint-disable-next-line import/no-cycle
import api from "../../../services/api";

export function SettingPage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profilPercentage, setProfilePercentage] = useState<number>(45);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [courseProfile, setCourseProfile] = useState<GetCourseRequest>();

  return (
    <Container>
      <TopBar title="Profile">
        <img src={profile} alt="profile pic" height="90%" />
      </TopBar>
      <Body>
        <Navbar user="Alexandre garage" profilPercentage={profilPercentage} />
        <RightContainerCourseSettings>
          <RightContainerTopCourseSettings>
            <CourseSetting
              title="Course setting"
              subTitleCourse="Course name"
              subTitleInfo="Price"
              subTitlePrice="Price"
              userProfile={courseProfile}
            />
            <CoursePicture
              title="Course picture"
              width="400px"
              height="340px"
            />
          </RightContainerTopCourseSettings>
          <CarrouselMaker
            title="Chapter of the course"
            startPoint={0}
            image={[
              {
                subtitle: "Learn basics",
              },
              {
                subtitle: "Hook form",
              },
              {
                subtitle: "Use effect",
              },
            ]}
          />
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

const Container = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
`;
