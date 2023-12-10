import styled from "styled-components";
import { ReactElement, useState } from "react";
import api from "../../../services/api";
import { CourseModel } from "services/api/out";
import CreateModal from "../../../components/modal";
import Dropdown from "../../../components/dropdown";

interface SideBarMenuProps {
  course: CourseModel;
}

function SideBarMenu(props: SideBarMenuProps): ReactElement {
  const { course } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync: createSectionMutation } = api.section.useCreateSection();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data: courseSections } = api.course.useCourseSection({
    id: course.id,
  });
  const handleClose = async () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async () => {
    try {
      if (title === "" || description === "") {
        throw Error("Title and description need to be define");
      }
      await createSectionMutation({
        createSectionModel: { courseId: course.id, title, description },
      });
      handleClose();
    } catch (err) {
      // pop up error
    }
  };

  return (
    <Container>
      <CreateModal
        title="Create New Section"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit}
        onClose={handleClose}
      >
        <InputField
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </CreateModal>
      <TopBoxContainer>
        {course.title}
        <SettingButton>Settings</SettingButton>
        <SectionContainer>
          <AddSectionContainer>
            Section
            <AddSectionButton onClick={() => setIsOpen(true)}>
              +
            </AddSectionButton>
          </AddSectionContainer>
          <Dropdown
            options={courseSections?.map((section) => section.title) ?? []}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </SectionContainer>
      </TopBoxContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 275px;

  background: white;

  padding: 8px;
  box-sizing: border-box;

  border-radius: 0px 12px 12px 0px;
  border: 1px solid #c7c7c7;
`;

const TopBoxContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;

  background: white;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 8px;
  border: 1px solid #876bf6;
`;

const SettingButton = styled.a`
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  color: #3d3d3d;

  cursor: pointer;

  padding: 3px 14px;
`;

const AddSectionButton = styled.a`
  cursor: pointer;
  font-size: 25px;
`;

const InputField = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const AddSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
`;

export default SideBarMenu;
