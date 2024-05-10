import styled from 'styled-components';
import QuestionSideBarHeader from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBarHeader/QuestionSideBarHeader';
import QuestionSideBarBody from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBarBody/QuestionSideBarBody';

interface QuestionsSideBarProps {
  lessonId: string;
}

const QuestionsSideBar = ({ lessonId }: QuestionsSideBarProps) => {
  return (
    <Container>
      <QuestionSideBarHeader lessonId={lessonId} />
      <QuestionSideBarBody lessonId={lessonId} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: #fff;
  border: 1px solid #e7e7e7;

  height: 100%;
  width: 300px;
`;

export default QuestionsSideBar;
