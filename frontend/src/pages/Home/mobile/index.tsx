import Title from "src/Components/Title";
import {PagesProps} from "src/pages/interface";
import styled from "styled-components";
import TopBar from '../../../Components/Topbar/navigation/index';
import { useCallback } from 'react';

const HomeMobile = ({ children }: PagesProps): JSX.Element => {
  const handleClickStartCourse = useCallback(() => {
    window.open('/course', '_self');
    console.log("handleClickStartCourse")
  }, []);

  return (
    <Container>
      {children}
      <TopBar/>
      <CenterTitle>
        <Button onClick={handleClickStartCourse}>
            Start Course
        </Button>
      </CenterTitle>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fafafa;
`;

const CenterTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  color: #db7094;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default HomeMobile;
