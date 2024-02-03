import type { ReactElement } from "react";
import styled from "styled-components";

import TopBar from "../../components/TopBar";
// eslint-disable-next-line import/no-cycle
import api from "../../services/api";
import { DefaultApi } from "../../services/api/out";

import DashboardContent from "./Content";

export function HomePage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = api.user.useUser();

  useEffect(() => {
    DefaultApi.healthCheck();
  }, []);

  return (
    <Container>
      <TopBar title="Ollamy Maker" />
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
