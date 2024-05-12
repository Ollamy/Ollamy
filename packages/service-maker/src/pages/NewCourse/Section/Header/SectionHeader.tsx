import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
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
  const { mutateAsync: removeSection } = sectionActions.useRemoveSection();

  const handleRemoveSection = useCallback(async () => {
    await removeSection({ idSectionModel: { id: sectionId } });
    setSearchParams('sectionId', undefined);
  }, [removeSection, sectionId, setSearchParams]);

  const handleCreateLesson = useCallback(() => {}, []);

  return (
    <Container>
      <SectionInfos>
        <Title weight={'bold'}>{data?.title || 'My section'}</Title>
        <Description weight={'light'}>{data?.description || ''}</Description>
      </SectionInfos>
      <Temp>
        <Button color={'green'}>
          <PlusIcon />
          Create new lesson
        </Button>
        <EditSectionButtonContainer>
          <IconButton variant={'surface'} color={'orange'}>
            <GearIcon />
          </IconButton>
          <CustomAlertDialog
            description={
              'This action cannot be undone. This will permanently delete this section and remove your data from our servers.'
            }
            TriggerButton={
              <IconButton variant={'soft'} color={'red'}>
                <TrashIcon />
              </IconButton>
            }
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
