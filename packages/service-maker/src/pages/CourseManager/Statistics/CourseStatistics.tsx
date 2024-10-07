import { useParams } from 'react-router-dom';
import { courseActions } from 'services/api/routes/course';
import { statisticsActions } from 'services/api/routes/statistics';
import styled from 'styled-components';

import { PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';

const CourseStatistics = () => {
  const { courseId } = useParams();
  const courseData = courseActions.useCourse({ id: courseId! });

  const courseStatisticsData = statisticsActions.useStatistics({
    courseId: courseId!,
    operation: 'ALL',
    type: 'COURSE',
  });

  const lessonsData = statisticsActions.useStatistics({
    courseId: courseId!,
    operation: 'ALL',
    type: 'LESSON',
  });

  const barChartData = useMemo(() => {
    if (!lessonsData.data) return [];
    return lessonsData.data.map((e) => ({
      name: e.title,
      Average: e.average,
      Minimum: e.min,
      Maximum: e.max,
    }));
  }, [lessonsData]);

  if (!courseId) return <h1>Error: No course id provided.</h1>;
  if (!courseStatisticsData.data) return <h1>Error: No data.</h1>;
  if (!courseData.data) return <h1>Error: No course data found.</h1>;
  if (!lessonsData.data) return <h1>Error: No lesson data found.</h1>;

  return (
    <Container>
      <CardSection>
        <CardContainer>
          <PersonIcon />
          Students Enrolled
          <Number>{courseData.data.numberOfUsers}</Number>
        </CardContainer>
        <CardContainer>
          <RocketIcon />
          Average grades
          <Number>{lessonsData.data[0].average} %</Number>
        </CardContainer>
      </CardSection>

      <BarChartContainer>
        <StatTitle>Grades by lesson</StatTitle>
        <ResponsiveContainer width="100%" style={{ flex: 1 }}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Average" fill="#e5bc74" />
            <Bar dataKey="Minimum" fill="#8884d8" />
            <Bar dataKey="Maximum" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </BarChartContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 60px;
  width: 100%;
  height: 100vh;
`;

const CardSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  width: 250px;
  border-radius: 4px;
  background: #fdfbff;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
`;

const Number = styled.p`
  font-size: 24px;
  font-weight: 800;
  margin: 0;
`;

const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;

  width: 100%;
  height: 400px;
  border-radius: 8px;

  background: white;
  box-shadow: 0 2px 6px 0 #00000015;
`;

const StatTitle = styled.h4`
  margin: 0;
`;

export default CourseStatistics;
