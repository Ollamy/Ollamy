import type { ReactElement } from 'react';
import styled from 'styled-components';

interface TopBarProps {
  title: string;
  children?: ReactElement;
}

function TopBar({ title, children }: TopBarProps) {
  return (
    <Container>
      <img src={'/assets/Ollamy.png'} alt="Ollamy logo" />
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 8px;
  box-sizing: border-box;
  background-color: #e6674f;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-height: 100%;
  }
`;

export default TopBar;
