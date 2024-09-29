import styled from 'styled-components';
import { CustomSelectButton } from 'components/RadixUi/Select/CustomSelectButton';
import { useParams } from 'react-router-dom';
import { courseActions } from 'services/api/routes/course';
import { MixIcon } from '@radix-ui/react-icons';

const StatisticsHeader = () => {
  const { courseId } = useParams();

  const courseData = courseActions.useCourse({ id: courseId! });

  const headerText =
    courseId && courseData.data ? courseData.data.title : 'Statistics';

  return (
    <Container>
      <TitleContainer>
        {courseData.data &&
          (courseData.data.picture ? (
            <CourseIcon src={courseData.data.picture} />
          ) : (
            <Placeholder>
              <MixIcon width={42} height={42} />
            </Placeholder>
          ))}
        <Title>{headerText}</Title>
      </TitleContainer>
      <CustomSelectButton />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: #1e1e1e;
  font-size: 32px;
  font-weight: 700;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  gap: 32px;
`;

const CourseIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
`;

export default StatisticsHeader;
