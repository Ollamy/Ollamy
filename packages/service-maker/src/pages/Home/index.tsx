import TopBar from '../../components/TopBar';
import styled from 'styled-components';
import { ReactElement } from 'react';

interface HomePageProps {}

const HomePage = ({}: HomePageProps): ReactElement => {
  return (
    <Container>
      <TopBar title={'Ollamy Maker'} />
    </Container>
  );
};

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;
`;

export default HomePage;
