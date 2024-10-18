import { useCallback } from 'react';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

import { Button } from '@radix-ui/themes';
import CourseCustomDialogTitleDescription from 'components/RadixUi/Dialog/CourseCustomDialogTitleDescription';
import toast from 'react-hot-toast';

type MoreOptionsType = { picture: string };

function HomeHeader() {
  const { mutateAsync: createNewCourse } = courseActions.useCreateCourse();

  const handleCreateCourse = useCallback(
    async (title: string, description: string, picture: string) => {
      try {
        await createNewCourse({
          createCourseModel: {
            title,
            description,
            picture,
          },
        });
        toast.success('Course successfully created');
      } catch (error) {
        toast.error('An error occured');
      }
    },
    [createNewCourse],
  );

  return (
    <Container>
      <Title>All your courses, in the same place</Title>
      <CourseCustomDialogTitleDescription
        dialogTitle={'Create a course'}
        dialogDescription={
          'Define the title and description of your new course.'
        }
        actionButtonValue={'Create a course'}
        TriggerButton={
          <CustomButton variant={'soft'}>Create a new course</CustomButton>
        }
        createFunction={handleCreateCourse}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: #1e1e1e;
  font-size: 32px;
  font-weight: 700;
`;

const CustomButton = styled(Button)`
  height: 60px;
  cursor: pointer;
`;

export default HomeHeader;
