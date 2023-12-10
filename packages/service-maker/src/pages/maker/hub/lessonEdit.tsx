import styled from "styled-components";
import { ReactElement, useEffect, useState } from "react";
import api from "../../../services/api";
import book from "../../../assets/book.png";
import quiz from "../../../assets/quiz.png";

import { LessonModel } from "services/api/out";

interface LessonEditProps {
  lesson: LessonModel;
}

function LessonEdit(props: LessonEditProps): ReactElement {
  const { lesson } = props;
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const isDirty = title !== lesson.title || description !== lesson.description;

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

  return (
    <Container>
      <EditBox>
        <InputsContainer>
          <InputTextContainer>
            Title
            <InputField
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputTextContainer>
          <InputTextContainer>
            Description
            <TextArea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputTextContainer>
        </InputsContainer>
        {isDirty && (
          <UpdateButton onClick={() => onSubmit()}>Update</UpdateButton>
        )}
      </EditBox>
      <SubContainer>
        <ButtonContainer>
          <img alt="logo book" src={book} width="124" height="105" />
          Edit Lecture
        </ButtonContainer>
        <ButtonContainer>
          <img alt="logo Quiz" src={quiz} width="100" height="100" />
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

  padding: 48px 48px 16px 48px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 32px;

  gap: 7px;
  width: 300px;
  height: 200px;
`;

export default LessonEdit;
