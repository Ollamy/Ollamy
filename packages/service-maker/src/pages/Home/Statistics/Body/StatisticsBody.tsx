import { useMemo } from 'react';
import api from 'services/api';
import styled from 'styled-components';

import { PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

function StatisticsBody() {
  const { data } = api.user.useGetUserCourses();
  const navigate = useNavigate();

  const totalOfStudent = useMemo(() => {
    if (!data) return null;

    return data.courses.reduce(
      (acc, curr) => acc + (curr?.numberOfUsers || 0),
      0,
    );
  }, [data]);

  const handleClick = (id: string) => {
    navigate(`/course/${id}/statistics`);
  };

  return (
    <Container>
      <CardSection>
        <CardContainer>
          <PersonIcon />
          Students Enrolled
          <Number>{totalOfStudent}</Number>
        </CardContainer>
        <CardContainer>
          <RocketIcon />
          Average grades
          <Number>89 %</Number>
        </CardContainer>
      </CardSection>
      <CourseSection>
        {data?.courses?.map(({ title, id, pictureId }) => (
          <CourseItem key={id}>
            <CourseInfosContainer>
              <CourseImage src={pictureId} />
              <CourseTitle>{title}</CourseTitle>
            </CourseInfosContainer>
            <Button
              size={'1'}
              variant={'surface'}
              onClick={() => handleClick(id)}
            >
              View
            </Button>
          </CourseItem>
        ))}
      </CourseSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  gap: 60px;
  width: 100%;

  overflow: hidden;
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

const CourseSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;

  width: 100%;
  height: 40px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  background: white;
  border-radius: 4px;
  border: 1px solid gray;
`;

const CourseInfosContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const CourseImage = styled.img`
  height: 100%;
`;

const CourseTitle = styled.h3`
  margin: 0;
`;

export default StatisticsBody;
