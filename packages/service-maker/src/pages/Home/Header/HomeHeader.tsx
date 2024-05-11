import styled from 'styled-components';

import { Button } from '@radix-ui/themes';

// eslint-disable-next-line
interface HomeHeaderProps {}

function HomeHeader({}: HomeHeaderProps) {
  return (
    <Container>
      <Title>All your courses, in the same place</Title>
      <CustomButton variant={'soft'}>Create a new course</CustomButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 32px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  color: #1e1e1e;
  font-size: 32px;
  font-weight: 700;
`;

const CustomButton = styled(Button)`
  height: 60px;
  cursor: pointer;
`;

export default HomeHeader;
