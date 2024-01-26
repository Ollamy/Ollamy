import styled from "styled-components";
import DashboardContent from "./Content";
import { ReactElement, useEffect } from "react";
import TopBar from "../../components/TopBar";
import api from "../../services/api";
import { DefaultApi } from "../../services/api/out";

function HomePage(): ReactElement {
  const { data } = api.user.useUser();

  useEffect(() => {
    DefaultApi.healthCheck();
  }, []);

  return (
    <Container>
      <TopBar title={"Ollamy Maker"} />
      {data && (
        <span>
          Hello {data.firstname} {data.lastname}
        </span>
      )}
      <DashboardContent />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

export default HomePage;
