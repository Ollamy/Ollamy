import type { ReactElement } from "react";
import styled from "styled-components";

import TopBar from "../../components/TopBar";

function HomePage(): ReactElement {
  return (
    <Container>
      <TopBar title="Ollamy Maker" />
    </Container>
  );
}

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;
`;

export default HomePage;
