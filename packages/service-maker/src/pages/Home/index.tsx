import { type ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import api from 'services/api';
import { DefaultApi } from 'services/api/out';
import HomeSidePanel from 'pages/Home/SidePanel/HomeSidePanel';

function HomePage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = api.user.useUser();

  useEffect(() => {
    DefaultApi.healthCheck();
  }, []);

  return (
    <Container>
      <HomeSidePanel />
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

export default HomePage;
