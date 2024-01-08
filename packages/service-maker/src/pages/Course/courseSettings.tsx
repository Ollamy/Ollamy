import type { ReactElement } from "react";
import { useState } from "react";
import styled from "styled-components";

import profile from "../../assets/profile.png";
import { AnalyticComponent } from "../../components/analytics/analytic";
import { CarrouselMaker } from "../../components/Carrousel/carrousel";
import { IncomeComponent } from "../../components/Income/income";
import { Navbar } from "../../components/Navbar/navbar";
import TopBar from "../../components/TopBar";

export function FormationSetting(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profilPercentage, setProfilePercentage] = useState<number>(45);

  return (
    <Container>
      <TopBar title="Profile">
        <img src={profile} alt="profile pic" height="90%" />
      </TopBar>
      <Body>
        <Navbar user="Alexandre garage" profilPercentage={profilPercentage} />
        <RightContainerCourseSettings>
          <RightContainerTopCourseSettings>
            <IncomeComponent title="Total incomes" />
            <AnalyticComponent />
          </RightContainerTopCourseSettings>
          <CarrouselMaker
            title="All your courses"
            startPoint={0}
            image={[
              {
                subtitle: "React",
              },
              {
                subtitle: "React",
              },
              {
                subtitle: "React",
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
