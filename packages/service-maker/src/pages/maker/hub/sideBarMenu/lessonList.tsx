import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from 'services/api';
import CreateModal from 'components/modal';

interface LessonListProps {
  lessonId?: string;
  sectionId: string | null;
  courseId: string;
}

const LessonList = (props: LessonListProps) => {
  const navigate = useNavigate();

  const { sectionId, courseId, lessonId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState('');
  const { mutateAsync: createLessonMutation } = api.lesson.useCreateLesson();
  const { data: sectionLessons } = api.section.useSectionLessons(
    {
      id: sectionId ?? '',
    },
    { enabled: !!sectionId },
  );

  const handleClose = async () => {
    setIsOpen(false);
    setTitle('');
  };

  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(
    lessonId,
  );
  useEffect(() => {
    if (selectedLessonId) {
      if (sectionId)
        navigate(`/course/${courseId}/${sectionId}/${selectedLessonId}`);
    }
  }, [selectedLessonId]);

  useEffect(() => {
    if (lessonId === undefined) setSelectedLessonId(undefined);
  }, [lessonId]);
  const handleSubmit = async () => {
    try {
      if (title === '') throw Error('Title need to be define');
      if (!sectionId) throw Error('Section need to be define');

      await createLessonMutation({
        createLessonModel: { section_id: sectionId, title, description: '' },
      });
      handleClose();
    } catch (err) {
      // pop up error
    }
  };
  return (
    <>
      <CreateModal
        title="Create New Lesson"
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
      </CreateModal>
      {sectionLessons?.map((lesson, idx) => (
        <LessonBox
          key={idx}
          onClick={() => setSelectedLessonId(lesson.id)}
          is_selected={lesson.id === selectedLessonId}
        >
          <LessonTextIndex>0{idx + 1}</LessonTextIndex>
          {lesson.title}
        </LessonBox>
      ))}
      <PlusButton onClick={() => setIsOpen(true)}>+</PlusButton>
    </>
  );
};

const PlusButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 45px;
  width: 48px;
  height: 48px;
  border-radius: 32px;

  text-decoration: none;
  box-shadow:
    rgba(0, 0, 0, 0.5) 0 2px 0,
    rgba(0, 0, 0, 0.05) 0px -0.5px 0px inset;

  cursor: pointer;
  &:hover {
    background-color: lightgrey;
    border-color: darkgray;
  }
`;

const InputField = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const LessonBox = styled.div<{ is_selected: boolean }>`
  border-radius: 8px;
  border: 1px solid;
  border-color: ${(props) => (props.is_selected ? '#876BF6' : '#bdbdbd')};

  box-shadow: 2px 2px 8px 0px rgba(189, 189, 189, 0.25);

  display: flex;
  flex-direction: column;
  gap: 5px;

  padding-bottom: 25px;
  padding-top: 6px;
  text-align: center;
  width: 100%;

  color: #3d3d3d;
  font-size: 14px;
`;

const LessonTextIndex = styled.div`
  color: black;
  font-size: 16px;
`;

export default LessonList;
