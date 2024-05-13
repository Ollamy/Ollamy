import QuestionSideBarBody from 'pages/QuizEditor/Body/QuestionsSideBar/QuestionSideBarBody/QuestionSideBarBody';
import QuestionSideBarHeader from 'pages/QuizEditor/Body/QuestionsSideBar/QuestionSideBarHeader/QuestionSideBarHeader';
import styled from 'styled-components';

interface QuestionsSideBarProps {
  lessonId: string;
}

function QuestionsSideBar({ lessonId }: QuestionsSideBarProps) {
  return (
    <Container>
      <QuestionSideBarHeader lessonId={lessonId} />
      <QuestionSideBarBody lessonId={lessonId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: #fff;
  border: 1px solid #e7e7e7;

  height: 100%;
  width: 300px;
`;

export default QuestionsSideBar;
