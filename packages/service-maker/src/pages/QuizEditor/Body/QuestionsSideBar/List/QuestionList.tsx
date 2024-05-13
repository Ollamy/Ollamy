import QuestionRow from 'pages/QuizEditor/Body/QuestionsSideBar/List/Row/QuestionRow';
import { lessonActions } from 'services/api/routes/lesson';
import styled from 'styled-components';

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
  ) : (
    <p>No content</p>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  gap: 8px;

  overflow: scroll;
`;

export default QuestionList;
