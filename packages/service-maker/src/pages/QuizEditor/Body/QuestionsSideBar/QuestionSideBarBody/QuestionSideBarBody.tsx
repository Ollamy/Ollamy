import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { lessonActions } from 'services/api/routes/lesson';
import styled from 'styled-components';

interface QuestionSideBarBodyProps {
  lessonId: string;
}

function QuestionSideBarBody({ lessonId }: QuestionSideBarBodyProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const questionId = searchParams.get('questionId');

  const { data } = lessonActions.useGetLessonQuestions({ id: lessonId! });

  const handleRowClick = (id: string) => () => {
    setSearchParams({ questionId: id });
  };

  return data && data.length ? (
    <Container>
      {data.map((elem, index) => (
        <Row
          isActive={elem.id === questionId}
          onClick={handleRowClick(elem.id)}
          key={elem.id}
        >
          <RowIndexBadge>{index + 1}</RowIndexBadge>
          <p>{elem.title}</p>
        </Row>
      ))}
    </Container>
  ) : (
    <p>No content</p>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface RowProps {
  isActive: boolean;
}

const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background: ${({ isActive }) => (isActive ? '#ebebeb' : 'white')};
  cursor: pointer;

  &:hover {
    background: #ebebeb;
  }
`;

const RowIndexBadge = styled.p`
  background: #c86597;
  width: 80px;
  text-align: end;
  border-radius: 2px;
  padding: 6px 8px;
`;

export default QuestionSideBarBody;
