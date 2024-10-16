import { type ReactElement, useEffect, useState } from 'react';
import HomeBody from 'pages/Home/Home/Body/HomeBody';
import HomeHeader from 'pages/Home/Home/Header/HomeHeader';
import HomeSidePanel from 'pages/Home/SidePanel/HomeSidePanel';
import StatisticsBody from 'pages/Home/Statistics/Body/StatisticsBody';
import StatisticsHeader from 'pages/Home/Statistics/Header/StatisticsHeader';
import { SubscriptionBody } from 'pages/Home/Subscription/Body/SubscriptionBody';
import { SubscriptionHeader } from 'pages/Home/Subscription/Header/SubscriptionHeader';
import { DefaultApi } from 'services/api/out';
import styled from 'styled-components';

export type PageType = 'home' | 'statistics' | 'subscription';

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
      {currentPage === 'home' && (
        <SubContainer>
          <HomeHeader />
          <HomeBody />
        </SubContainer>
      )}
      {currentPage === 'statistics' && (
        <SubContainer>
          <StatisticsHeader />
          <StatisticsBody />
        </SubContainer>
      )}
      {currentPage === 'subscription' && (
        <SubContainer>
          <SubscriptionHeader />
          <SubscriptionBody />
        </SubContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;

  background: #f1f3f6;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 76px;

  flex: 1;
  width: 100%;

  padding: 32px;
  box-sizing: border-box;
`;

export default HomePage;
