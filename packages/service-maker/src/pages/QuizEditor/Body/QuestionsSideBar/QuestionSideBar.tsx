import QuestionSideBarHeader from 'pages/QuizEditor/Body/QuestionsSideBar/Header/QuestionSideBarHeader';
import QuestionList from 'pages/QuizEditor/Body/QuestionsSideBar/List/QuestionList';
import styled from 'styled-components';

interface QuestionsSideBarProps {
  lessonId: string;
}

function QuestionsSideBar({ lessonId }: QuestionsSideBarProps) {
  return (
    <Container>
      <QuestionSideBarHeader lessonId={lessonId} />
      <QuestionList lessonId={lessonId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;

  background: #fff;
  border: 1px solid #e7e7e7;

  padding: 20px 0;
  box-sizing: border-box;

  max-height: 100%;
  min-width: 300px;
  max-width: 300px;

  > * {
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export default QuestionsSideBar;
