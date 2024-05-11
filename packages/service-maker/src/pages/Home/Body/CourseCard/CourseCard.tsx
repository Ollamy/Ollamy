import styled from 'styled-components';

// eslint-disable-next-line
interface CourseCardProps {}

const CourseCard = ({}: CourseCardProps) => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 350px;
  height: 300px;

  border-radius: 2px;
  border: 1px solid #d4d4d4;
  background: linear-gradient(132deg, #e0f1ff 10.95%, #f9f9ff 93.46%);
`;

export default CourseCard;
