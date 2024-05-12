import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import api from 'services/api';
import type { SectionModel } from 'services/api/out';
import styled from 'styled-components';

interface SectionEditProps {
  section: SectionModel;
}

function SectionEdit(props: SectionEditProps): ReactElement {
  const { section } = props;
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const isDirty =
    title !== section.title || description !== section.description;

  useEffect(() => {
    setTitle(section.title);
    setDescription(section.description);
  }, [section]);

  const { mutateAsync: updateSectionMutation } = api.section.useUpdateSection();
  const onSubmit = async (): Promise<void> => {
    try {
      await updateSectionMutation({
        id: section?.id,
        updateSectionModel: { ...section, title, description },
      });
    } catch (err) {
      /* empty */
    }
  };

  return (
    <Container>
      <TitleContainer>Section</TitleContainer>
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 16px 48px 16px 48px;
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

const TitleContainer = styled.a`
  font-size: 18px;
  font-weight: bold;
`;

export default SectionEdit;
