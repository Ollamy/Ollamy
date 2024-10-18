import { useCallback } from 'react';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import type { CreateSectionModel } from 'services/api/out';
import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import 'styles/dialog.css';

import { PlusIcon } from '@radix-ui/react-icons';
import { Heading, IconButton } from '@radix-ui/themes';
import toast from 'react-hot-toast';

interface SectionCreatorProps {
  courseId: CreateSectionModel['courseId'];
}

function SectionCreator({ courseId }: SectionCreatorProps) {
  const { mutateAsync: createNewSection } = sectionActions.useCreateSection();

  const handleCreateSection = useCallback(
    async (title: string, description: string) => {
      try {
        await createNewSection({
          createSectionModel: {
            courseId,
            title,
            description,
          },
        });
        toast.success('Section successfully created');
      } catch (error) {
        toast.error('An error occured');
      }
    },
    [courseId, createNewSection],
  );

  return (
    <Container>
      <CustomHeading>Sections</CustomHeading>
      <CustomDialogTitleDescription
        dialogTitle={'Add section'}
        dialogDescription={
          'Define the title and description of your new section.'
        }
        actionButtonValue={'New section'}
        TriggerButton={
          <IconButton variant={'soft'}>
            <PlusIcon />
          </IconButton>
        }
        createFunction={handleCreateSection}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 20px 20px;
  box-sizing: border-box;
`;

const CustomHeading = styled(Heading)`
  color: #3d3d3d;
  font-size: 16px;
`;

export default SectionCreator;
