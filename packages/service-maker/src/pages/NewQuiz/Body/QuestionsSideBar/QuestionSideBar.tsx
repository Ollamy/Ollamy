import styled from 'styled-components';
import QuestionSideBarHeader from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBarHeader';

// eslint-disable-next-line
interface QuestionsSideBarProps {}

const QuestionsSideBar = ({}: QuestionsSideBarProps) => {
  return (
    <Container>
      <QuestionSideBarHeader />
    </Container>
  );
};

const Container = styled.div``;

export default QuestionsSideBar;
