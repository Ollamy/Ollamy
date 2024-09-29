import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CourseStatistics from 'pages/CourseManager/Statistics/CourseStatistics';
import HomeBody from 'pages/Home/Home/Body/HomeBody';
import HomeHeader from 'pages/Home/Home/Header/HomeHeader';
import type { PageType } from 'pages/Home/HomePage';
import HomeSidePanel from 'pages/Home/SidePanel/HomeSidePanel';
import StatisticsBody from 'pages/Home/Statistics/Body/StatisticsBody';
import StatisticsHeader from 'pages/Home/Statistics/Header/StatisticsHeader';
import { DefaultApi } from 'services/api/out';
import styled from 'styled-components';

function Dashboard() {
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

      <Routes>
        <Route
          path={'home'}
          element={
            <SubContainer>
              <HomeHeader />
              <HomeBody />
            </SubContainer>
          }
        />

        <Route
          path={'statistics'}
          element={
            <SubContainer>
              <StatisticsHeader />
              <StatisticsBody />
            </SubContainer>
          }
        />

        <Route
          path={'course/:courseId/statistics'}
          element={
            <SubContainer>
              <StatisticsHeader />
              <CourseStatistics />
            </SubContainer>
          }
        />
      </Routes>
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

export default Dashboard;
