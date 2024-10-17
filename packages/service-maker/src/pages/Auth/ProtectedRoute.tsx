import type { MouseEventHandler, ReactElement } from 'react';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'services/api/routes/user';
import styled from 'styled-components';

import { Button, Spinner } from '@radix-ui/themes';

interface ProtectedRouteProps {
  children: ReactElement;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = userActions.useGetUser();

  const handleLoginClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault();

      navigate('/login');
    },
    [navigate],
  );

  const loggedInStatus = useMemo(
    () =>
      isLoading && !isError ? 'loading' : !data ? 'noSession' : 'loggedIn',
    [data, isError, isLoading],
  );

  return loggedInStatus === 'loggedIn' ? (
    children
  ) : loggedInStatus === 'loading' ? (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  ) : (
    <Container>
      <DimmerModal>
        <HeaderContainer>
          <Title>403</Title>
          <Description>
            {"You don't seem to have access to this page please login!"}
          </Description>
        </HeaderContainer>
        <Button
          size={'4'}
          color={'green'}
          style={{ width: '100%' }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </DimmerModal>
    </Container>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/assets/background.svg');
`;

const DimmerModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  gap: 60px;

  width: 600px;
  padding: 16px;
  box-sizing: border-box;

  border-radius: 8px;

  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

  @media only screen and (max-width: 600px) {
    height: auto;
    margin: 16px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  color: #1e1e1e;
  font-size: 60px;
  font-weight: 700;
`;

const Description = styled.div`
  margin: 0;
`;

export default ProtectedRoute;
