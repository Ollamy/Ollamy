import type { ChangeEvent, ReactElement } from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";

import flag from "../../assets/🦆 icon _flag_.svg";
import people from "../../assets/🦆 icon _people_.svg";
import pie from "../../assets/🦆 icon _pie chart_.svg";
import profile from "../../assets/profile.png";
import react from "../../assets/react.svg";
import TopBar from "../../components/TopBar";

interface SettingPageProps {}

export function SettingPage({}: SettingPageProps): ReactElement {
  const [editMode, setEditMode] = useState(false);
  const [profilPercentage, setProfilePercentage] = useState<string>("45");

  const [email, setEmail] = useState("nicolas.heude@epitech.eu");
  const [birthDate, setBirthDate] = useState("2002-07-25");

  const handleClickRemoveAccount = useCallback(() => {
    alert("Are you sure you want to remove your account ?");
  }, []);

  const handleClickEditMode = useCallback(() => {
    setEditMode((old) => !old);
  }, []);

  const changeBirthDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  }, []);

  const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <Container>
      <TopBar title="Profile">
        <img src={profile} alt="profile pic" height="90%" />
      </TopBar>
      <Body>
        <NavLeftContainer>
          <NavLeftContainerNameProps>
            <Title>Alexandre garage</Title>
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
        <RightContainerCourseSettings>
          <RightContainerTopCourseSettings>
            <RightContainerSetting $width="540px">
              <Title>Course setting</Title>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <SubTitle>Course name</SubTitle>
                <InputCourse $width="80%" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: 1,
                  width: "80%",
                }}
              >
                <div>
                  <SubTitle>Price</SubTitle>
                  <InputCourse $width="200px" />
                </div>
                <div>
                  <SubTitle>Price</SubTitle>
                  <InputCourse $width="200px" />
                </div>
              </div>
            </RightContainerSetting>
            <RightContainerSetting $width="400px">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <Title>Course picture</Title>
                <img src={profile} alt="" height="180px" />
                <UploadPictureButton>Upload picture</UploadPictureButton>
              </div>
            </RightContainerSetting>
          </RightContainerTopCourseSettings>
          <RightContainerTopCourseSettings>
            <RightContainerSetting $width="1040px">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flex: 1,
                  gap: "8px",
                }}
              >
                <Title>Chapter of the course</Title>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                    gap: "60px",
                    flex: 1,
                  }}
                >
                  <CourseCard>
                    <img src={react} alt="" height="100px" />
                    <SubTitle>Price</SubTitle>
                  </CourseCard>
                  <CourseCard>
                    <img src={react} alt="" height="100px" />
                    <SubTitle>Price</SubTitle>
                  </CourseCard>
                  <CourseCard>
                    <img src={react} alt="" height="100px" />
                    <SubTitle>Price</SubTitle>
                  </CourseCard>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div>O</div>
                  <div>O</div>
                  <div>O</div>
                </div>
              </div>
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

const NavLeftContainer = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 400px;
  background-color: #ffffff;
  flex: 1;

  justify-content: flex-start;
  align-items: center;
`;

const NavLeftContainerNameProps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 24px;
  gap: 30px;
  border-bottom: 1px solid #556080;
`;

const NavLeftContainerPercentageProps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  flex: 1;
  width: 100%;
  gap: 30px;
  padding: 24px;
  border-bottom: 1px solid #556080;
`;

const NavLeftContainerNavigationProps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  flex: 3;
  width: 100%;
  padding: 20px;
`;

const RightContainerCourseSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* flex: 1; */
  background-color: #f1f3f6;
`;

const RightContainerTopCourseSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  /* flex: 1; */
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

const Title = styled.h2`
  margin: 0;
  color: #556080;
`;

const NewCourseButton = styled.button`
  width: 80%;
  height: 60px;
  background-color: #e69c8e;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 34px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  &:hover {
    background-color: #e8c1b9;
  }
`;

const UploadPictureButton = styled(NewCourseButton)`
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  color: rgba(138, 110, 252, 0.67);
  background: #fff;
`;

const StatusBar = styled.div`
  display: flex;
  width: 90%;
  height: 30px;
  border-radius: 34px;
  background-color: #d9d9d9;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background-color: #e69c8e;
    border-radius: 34px;
  }
`;

const NavOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  padding: 12px;
  width: 50%;
  gap: 40px;
`;

const SubTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  color: #556080;
`;

const CourseCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  gap: 40px;
  background-color: #f1f3f6;
`;

const Text = styled.p`
  color: #3d3d3d;
  font-weight: 400;
  margin: 0;
`;

const InputCourse = styled.input<{ $width: string }>`
  height: 32px;
  width: ${(props) => props.$width};
  color: #3d3d3d;
  font-size: 14px;
  padding: 24px;
  border-radius: 4px;
  border: 1px solid #999191;
`;

const Container = styled.div`
  display: block;

  width: 100vw;
  height: 100vh;
`;

const ProfileButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;

  height: 100%;
  width: 4%;
  padding: 0 6px;
  box-sizing: border-box;

  color: white;
  border-radius: 50%;
  background: #e74c3c;

  border: none;
  cursor: pointer;
  text-decoration: none;

  background-color: gray;
`;

// const RemoveButton = styled(LogoutButton)`
//   height: 42px;
//   width: 100%;

//   font-size: 16px;
// `;
