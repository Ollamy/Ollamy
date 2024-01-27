import styled from 'styled-components';
import React, { ReactElement, useEffect } from 'react';
import api from 'src/services/api';
import { DefaultApi } from 'src/services/api/out';
import TopBar from 'src/components/TopBar';
import DashboardContent from 'src/pages/Home/Content';

function HomePage(): ReactElement {
  const { data } = api.user.useUser();

  useEffect(() => {
    DefaultApi.healthCheck();
  }, []);

  return (
    <Container>
      <TopBar title={'Ollamy Maker'} />
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
