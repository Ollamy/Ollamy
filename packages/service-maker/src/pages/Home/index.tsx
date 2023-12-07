import type { ReactElement } from "react";
import styled from "styled-components";

import TopBar from "../../components/TopBar";
import api from "../../services/api";

function HomePage(): ReactElement {
  const { data } = api.user.useUser();

  return (
    <Container>
      <TopBar title="Ollamy Maker" />
      {data && (
        <span>
          Hello {data.firstname} {data.lastname}
        </span>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;
`;

export default HomePage;
