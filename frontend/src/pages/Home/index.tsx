import styled from "styled-components";
import {ReactNode} from "react";

interface PagesProps {
  children?: ReactNode;
}

const HomeComponent = ({ children }: PagesProps): JSX.Element => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: red;
`;

export default HomeComponent;
