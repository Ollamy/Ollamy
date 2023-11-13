import TopBar from "../../components/TopBar";
import styled from "styled-components";
import { ReactElement } from "react";
import DashboardContent from "./Content";

interface HomePageProps {}

const HomePage = ({}: HomePageProps): ReactElement => {
  return (
    <Container>
      <TopBar title={"Ollamy Maker"} />
      <DashboardContent />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

export default HomePage;
