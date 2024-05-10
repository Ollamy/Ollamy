import styled from 'styled-components';
import { lessonActions } from 'services/api/routes/lesson';

interface QuestionSideBarBodyProps {
  lessonId: string;
}

const QuestionSideBarBody = ({ lessonId }: QuestionSideBarBodyProps) => {
  // const { data } = lessonActions.useGetLessonQuestion({ id: lessonId! });

  const data = [
    {
      id: 'string',
      lessonId: 'string',
      title: 'string',
      description: 'string',
      typeAnswer: 'string',
      typeQuestion: 'string',
      trustAnswerId: 'string',
      pictureId: 'string',
      difficulty: 'string',
      order: 'string',
      points: 0,
    },
    {
      id: 'string',
      lessonId: 'string',
      title: 'string',
      description: 'string',
      typeAnswer: 'string',
      typeQuestion: 'string',
      trustAnswerId: 'string',
      pictureId: 'string',
      difficulty: 'string',
      order: 'string',
      points: 0,
    },
  ];

  return data && data.length ? (
    <Container>
      {data.map((elem) => {
        return <Row>{elem.title}</Row>;
      })}
    </Container>
  ) : (
    <p>No content</p>
  );
};

const Container = styled.div`
  display: flex;
  gap: 4px;
`;

const Row = styled.div`
  background: red;
`;

export default QuestionSideBarBody;
