import styled, { keyframes } from 'styled-components';

function LoadingComponent() {
  return (
    <div>
      <Spinner />
    </div>
  );
}

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
`;

export default LoadingComponent;
