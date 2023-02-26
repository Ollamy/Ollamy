import Title from "src/Components/Title";
import {PagesProps} from "src/pages/interface";
import styled from "styled-components";
import TopBar from '../../../Components/Topbar/navigation/index';
import { useCallback } from 'react';
import axios from 'axios';

const HomeMobile = ({ children }: PagesProps): JSX.Element => {
  const handleClickStartCourse = useCallback(async () => {
    const res = await axios.post(`http://localhost:3000/user/register/`, {
      "Firstname": "n3ame",
      "Lastname": "last3name",
      "Email": "test133@test.test",
      "Password": "12334",
    });
    console.log(res.data);
    // window.open('/course', '_self');
    // console.log("handleClickStartCourse")
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
