import styled from 'styled-components';

export const SubscriptionHeader = ({}) => {
  return (
    <Container>
      <Title>Subscription</Title>
      <Subtitle>Choose your plan</Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 24px;
`;

const Title = styled.h1`
  margin: 0;
  color: #1e1e1e;
  font-size: 32px;
  font-weight: 700;
`;

const Subtitle = styled.h3`
  margin: 0;
  color: #1e1e1e;
  font-weight: 500;
`;
