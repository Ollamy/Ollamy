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
      title: 'Hello',
      description: 'Hello world....',
      typeAnswer: 'TEXT',
      typeQuestion: 'TEXT',
      trustAnswerId: 'string',
      pictureId: 'string',
      difficulty: 'INTERMEDIATE',
      order: 'a0',
      points: 1,
    },
    {
      id: 'string',
      lessonId: 'string',
      title: 'Bonjour',
      description: 'Bonjour monde...',
      typeAnswer: 'TEXT',
      typeQuestion: 'TEXT',
      trustAnswerId: 'string',
      pictureId: 'string',
      difficulty: 'BEGINNER',
      order: 'a0',
      points: 1,
    },
  ];

  return data && data.length ? (
    <Container>
      {data.map((elem, index) => {
        return (
          <Row>
            <RowIndexBadge>{index + 1}</RowIndexBadge>
            <p>{elem.title}</p>
          </Row>
        );
      })}
    </Container>
  ) : (
    <p>No content</p>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background: white;

  &:hover {
    background: #EBEBEB;
  }
`;

const RowIndexBadge = styled.p`
  background: #C86597;
  width: 80px;
  text-align: end;
  border-radius: 2px;
  padding: 6px 8px;
`;

export default QuestionSideBarBody;
