import QuestionRow from 'pages/QuizEditor/Body/QuestionsSideBar/List/Row/QuestionRow';
import { lessonActions } from 'services/api/routes/lesson';
import styled from 'styled-components';

import { Spinner, Text } from '@radix-ui/themes';

interface QuestionListProps {
  lessonId: string;
}

function QuestionList({ lessonId }: QuestionListProps) {
  const { data } = lessonActions.useGetLessonQuestions({ id: lessonId! });

  return data && data.length ? (
    <Container>
      {data.map(({ id, title }, index) => (
        <QuestionRow key={id} questionId={id} title={title} index={index} />
      ))}
    </Container>
  ) : data && !data.length ? (
    <LoadingContainer>
      <Text>No questions created…</Text>
    </LoadingContainer>
  ) : (
    <LoadingContainer>
      <Spinner />
      <Text>Loading…</Text>
    </LoadingContainer>
  );
}

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;

  overflow: scroll;

  > {
    :not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--gray-11);
`;

export default QuestionList;
