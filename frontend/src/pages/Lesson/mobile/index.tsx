import {PagesProps} from "src/pages/interface";
import styled from "styled-components";
import TopBarLesson from '../../../Components/Topbar/lesson/index';

const LessonMobile = ({ children }: PagesProps): JSX.Element => {
  return (
    <Container>
      {children}
      <TopBarLesson completion={30} lifeCount={5}/>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fafafa;
`;

export default LessonMobile;
