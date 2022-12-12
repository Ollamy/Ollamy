import {PagesProps} from "src/pages/interface";
import styled from "styled-components";

const HomeDesktop = ({ children }: PagesProps): JSX.Element => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default HomeDesktop;
