import type { ReactElement } from 'react';
import styled from 'styled-components';

import AddQuestion from 'pages/QuizEditor/Body/QuestionsSideBar/Header/AddQuestion/AddQuestion';

interface QuestionSideBarHeaderProps {
  lessonId: string;
}

function QuestionSideBarHeader({
  lessonId,
}: QuestionSideBarHeaderProps): ReactElement {
  return (
    <Container>
      <Title>Quiz questions</Title>
      <AddQuestion lessonId={lessonId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h3``;

export default QuestionSideBarHeader;
