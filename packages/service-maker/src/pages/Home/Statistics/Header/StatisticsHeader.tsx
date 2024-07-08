import styled from 'styled-components';
import { CustomSelectButton } from 'components/RadixUi/Select/CustomSelectButton';

// eslint-disable-next-line
interface StatisticsHeaderProps {}

const StatisticsHeader = ({}: StatisticsHeaderProps) => {
  return (
    <Container>
      <Title>Statistics</Title>
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

export default StatisticsHeader;
