import {PagesProps} from "src/pages/interface";
import Title from "src/Components/Title";
import styled from "styled-components";

const HomeBrowser = ({ children }: PagesProps): JSX.Element => {
  return (
    <Container>
      {children}
      <Title>Welcome</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default HomeBrowser;
