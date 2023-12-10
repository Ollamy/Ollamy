import styled from "styled-components";
import { ReactElement } from "react";
import TopBar from "../../../components/TopBar";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../components/loading/spinner";
import SideBarMenu from "./sideBarMenu";

function MakerHubPage(): ReactElement {
  const navigate = useNavigate();

  let { id, sectionId, lessonId } = useParams();
  if (!id) {
    navigate("/home");
    return <></>;
  }

  const { data: course } = api.course.useCourse({ id });

  if (!course)
    return (
      <Container>
        <TopBar title={"Ollamy Maker"} />
        <LoadingComponent />
      </Container>
    );
  return (
    <Container>
      <TopBar title={"Ollamy Maker"} />
      <Body>
        <SideBarMenu course={course} sectionId={sectionId} lessonId={lessonId} />
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  gap: 32px;

  background: #f1f3f6;
`;

const Body = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;
  gap: 64px;
`;

export default MakerHubPage;
