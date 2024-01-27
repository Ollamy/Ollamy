import styled from 'styled-components';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonModel } from 'src/services/api/out';
import api from 'src/services/api';

interface LessonEditProps {
  lesson: LessonModel;
}

function LessonEdit(props: LessonEditProps): ReactElement {
  const { lesson } = props;
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const isDirty = title !== lesson.title || description !== lesson.description;

  const { id, sectionId, lessonId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(lesson.title);
    setDescription(lesson.description);
  }, [lesson]);

  const { mutateAsync: updateLessonMutation } = api.lesson.useUpdateLesson();
  const onSubmit = async (): Promise<void> => {
    try {
      await updateLessonMutation({
        id: lesson?.id,
        lessonModel: { ...lesson, title, description },
      });
    } catch (err) {
      /* empty */
    }
  };

  const handleEdit = useCallback(() => {
    navigate(`/quiz/${id}/${sectionId}/${lessonId}`);
  }, [id, lessonId, navigate, sectionId]);

  return (
    <Container>
      <EditBox>
        <TitleContainer>Lesson</TitleContainer>
        <InputsContainer>
          <InputTextContainer>
            Title
            <InputField type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </InputTextContainer>
          <InputTextContainer>
            Description
            <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </InputTextContainer>
        </InputsContainer>
        {isDirty && <UpdateButton onClick={() => onSubmit()}>Update</UpdateButton>}
      </EditBox>
      <SubContainer>
        <ButtonContainer>
          <img alt="logo book" src={'assets/book.png'} width="124" height="105" />
          Edit Lecture
        </ButtonContainer>
        <ButtonContainer onClick={handleEdit}>
          <img alt="logo Quiz" src={'assets/quiz.png'} width="100" height="100" />
          Edit Quiz
        </ButtonContainer>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 80px;
`;

const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 16px 48px 16px 48px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const InputField = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;

  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InputsContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  text-indent: 5px;
  font-size: 14px;
`;

const UpdateButton = styled.button`
  font-size: 16px;
  color: #876bf6;
  background-color: #fff;
  padding: 8px 16px;

  border: 1px solid;
  border-radius: 8px;

  cursor: pointer;
  align-self: end;
`;

const SubContainer = styled.a`
  display: flex;
  justify-content: space-around;

  width: 100%;
`;

const ButtonContainer = styled.a`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 32px;

  gap: 7px;
  width: 300px;
  height: 200px;
`;

const TitleContainer = styled.a`
  font-size: 18px;
  font-weight: bold;
`;

export default LessonEdit;
