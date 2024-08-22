import QuestionRow from 'pages/QuizEditor/Body/QuestionsSideBar/List/Row/QuestionRow';
import { lessonActions } from 'services/api/routes/lesson';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Spinner, Text } from '@radix-ui/themes';

interface QuestionListProps {
  lessonId: string;
}

function QuestionList({ lessonId }: QuestionListProps) {
  const { data } = lessonActions.useGetLessonQuestions({ id: lessonId! });

  const { mutate: useSortLesson } = questionActions.useSortQuestion();

  console.log(data);

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    if (!data) return;

    const dragSection = data[dragIndex];
    const newOrder = [...data] as unknown as any;
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragSection);

    const after = newOrder[dragIndex]?.order || null;
    const before = newOrder[hoverIndex + 1]?.order || null;

    console.log({ dragIndex, hoverIndex });
    console.log({ after, before });
    console.log({ dragSection });

    useSortLesson({
      origin: dragSection.id,
      after,
      before,
    });
  };

  return data && data.length ? (
    <Container>
      {data.map(({ id, title }, index) => (
        <QuestionRow
          key={id}
          questionId={id}
          title={title}
          index={index}
          moveQuestion={moveQuestion}
        />
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
