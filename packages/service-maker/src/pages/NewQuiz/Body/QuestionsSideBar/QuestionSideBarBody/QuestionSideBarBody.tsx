import styled from 'styled-components';
import { lessonActions } from 'services/api/routes/lesson';
import { useNavigate, useParams } from 'react-router-dom';

interface QuestionSideBarBodyProps {
  lessonId: string;
}

const QuestionSideBarBody = ({ lessonId }: QuestionSideBarBodyProps) => {
  const { data } = lessonActions.useGetLessonQuestion({ id: lessonId! });

  const navigate = useNavigate();

  const { id: courseId, sectionId } = useParams();

  const handleRowClick = (id: string) => () => {
    navigate(
      `/quiz/${courseId}/section/${sectionId}/lesson/${lessonId}/question/${id}`,
    );
  };

  return data && data.length ? (
    <Container>
      {data.map((elem, index) => {
        return (
          <Row onClick={handleRowClick(elem.id)} key={elem.id}>
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
