import type { ReactElement } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from 'components/dropdown';
import CreateModal from 'components/modal';
import LessonList from 'pages/maker/hub/sideBarMenu/lessonList';
import api from 'services/api';
import type { GetCourseRequest } from 'services/api/out';
import styled from 'styled-components';

interface SideBarMenuProps {
  course: GetCourseRequest;
  sectionId?: string;
  lessonId?: string;
}

function SideBarMenu(props: SideBarMenuProps): ReactElement {
  const navigate = useNavigate();

  const { course, sectionId, lessonId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { id: courseId } = useParams();

  const { mutateAsync: createSectionMutation } = api.section.useCreateSection();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    sectionId ?? null,
  );

  const { data: courseSections } = api.course.useGetCourseSection({
    id: courseId!,
  });
  const handleClose = async () => {
    setIsOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleSubmit = async () => {
    try {
      if (title === '' || description === '') {
        throw Error('Title and description need to be define');
      }
      await createSectionMutation({
        createSectionModel: { courseId: courseId!, title, description },
      });
      handleClose();
    } catch (err) {
      // pop up error
    }
  };

  const changeSection = (newSectionId: string | null) => {
    setSelectedSectionId(newSectionId);
    if (newSectionId) navigate(`/course/${courseId}/section/${newSectionId}`);
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
        <SettingButton onClick={() => navigate('/home')}>
          Settings
        </SettingButton>
        <SectionContainer>
          <AddSectionContainer>
            Section
            <AddSectionButton onClick={() => setIsOpen(true)}>
              +
            </AddSectionButton>
          </AddSectionContainer>
          <Dropdown
            options={
              courseSections?.map((section) => ({
                label: section.title,
                id: section.id,
              })) ?? []
            }
            selectedOption={selectedSectionId}
            setSelectedOption={changeSection}
          />
        </SectionContainer>
      </TopBoxContainer>
      <LessonList
        sectionId={selectedSectionId}
        courseId={courseId!}
        lessonId={lessonId}
      />
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
