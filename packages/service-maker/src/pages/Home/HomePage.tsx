import { type ReactElement, useEffect, useState } from 'react';
import HomeBody from 'pages/Home/Body/HomeBody';
import HomeHeader from 'pages/Home/Header/HomeHeader';
import HomeSidePanel from 'pages/Home/SidePanel/HomeSidePanel';
import { DefaultApi } from 'services/api/out';
import styled from 'styled-components';

export type PageType = 'home' | 'profile' | 'settings';

function HomePage(): ReactElement {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    DefaultApi.healthCheck();
  }, []);

  return (
    <Container>
      <HomeSidePanel
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <HomeContainer>
        <HomeHeader />
        <HomeBody />
      </HomeContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 76px;

  flex: 1;
  width: 100%;

  padding: 32px;
  box-sizing: border-box;
`;

export default HomePage;
