import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { lessonActions } from 'services/api/routes/lesson';
import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import { GearIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Heading, IconButton, Text } from '@radix-ui/themes';

interface SectionHeaderProps {
  sectionId: string;
}

function SectionHeader({ sectionId }: SectionHeaderProps) {
  const [, setSearchParams] = useSearchParams();

  const { data } = sectionActions.useSection({ id: sectionId });
  const { mutateAsync: updateSection } = sectionActions.useUpdateSection();
  const { mutateAsync: removeSection } = sectionActions.useRemoveSection();
  const { mutateAsync: createNewLesson } = lessonActions.useCreateLesson();

  const handleRemoveSection = useCallback(async () => {
    await removeSection({ idSectionModel: { id: sectionId } });
    setSearchParams('sectionId', undefined);
  }, [removeSection, sectionId, setSearchParams]);

  const handleCreateLesson = useCallback(
    (title: string, description: string) => {
      createNewLesson({
        createLessonModel: {
          sectionId,
          title,
          description,
        },
      });
    },
    [createNewLesson, sectionId],
  );

  const handleEditSection = useCallback(
    async (title: string, description: string) => {
      await updateSection({
        id: sectionId,
        updateSectionModel: { title, description },
      });
    },
    [updateSection, sectionId],
  );

  return (
    <Container>
      <SectionInfos>
        <Title weight={'bold'}>{data?.title || 'My section'}</Title>
        <Description weight={'light'}>{data?.description || ''}</Description>
      </SectionInfos>
      <Temp>
        <CustomDialogTitleDescription
          dialogTitle={'Add lesson'}
          dialogDescription={
            'Define the title and description of your new lesson.'
          }
          actionButtonValue={'New lesson'}
          TriggerButton={
            <Button color={'green'}>
              <PlusIcon />
              Create new lesson
            </Button>
          }
          createFunction={handleCreateLesson}
        />

        <EditSectionButtonContainer>
          <CustomDialogTitleDescription
            dialogTitle={'Edit section'}
            dialogDescription={
              'Edit the title and description of your current section.'
            }
            defaultTitle={data?.title}
            defaultDescription={data?.description}
            actionButtonValue={'Update'}
            TriggerButton={
              <IconButton variant={'surface'} color={'orange'}>
                <GearIcon />
              </IconButton>
            }
            createFunction={handleEditSection}
          />

          <CustomAlertDialog
            description={
              'This action cannot be undone. This will permanently delete this section and remove your data from our servers.'
            }
            TriggerButton={
              <IconButton variant={'soft'} color={'red'}>
                <TrashIcon />
              </IconButton>
            }
            actionButtonValue={'Yes, delete section'}
            onAction={handleRemoveSection}
          />
        </EditSectionButtonContainer>
      </Temp>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 38px;

  width: 100%;
`;

const SectionInfos = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const Title = styled(Heading)``;

const Description = styled(Text)``;

const Temp = styled.div`
  display: flex;

  justify-content: space-between;
`;

const EditSectionButtonContainer = styled.div`
  display: flex;

  gap: 8px;
`;

export default SectionHeader;
