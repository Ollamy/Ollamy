import { useCallback } from 'react';
import type { CreateSectionModel } from 'services/api/out';
import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { Button, Heading, IconButton } from '@radix-ui/themes';

interface SectionCreatorProps {
  courseId: CreateSectionModel['courseId'];
}

function SectionCreator({ courseId }: SectionCreatorProps) {
  const { mutateAsync: createNewSection } = sectionActions.useCreateSection();

  const handleCreateSection = useCallback(async () => {
    console.log('here');
    await createNewSection({
      createSectionModel: {
        courseId,
        title: 'Hello',
        description: 'Hello world',
      },
    });
  }, [courseId, createNewSection]);

  return (
    <Container>
      <CustomHeading>Sections</CustomHeading>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <IconButton>
            <PlusIcon />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={'DialogOverlay'} />
          <Dialog.Content className={'DialogContent'}>
            <Dialog.Title className={'DialogTitle'}>Edit profile</Dialog.Title>
            <Dialog.Description className={'DialogDescription'}>
              {'Define the title and description of your new section.'}
            </Dialog.Description>
            <fieldset className={'DialogFieldset'}>
              <label className={'DialogLabel'} htmlFor={'title'}>
                Title
              </label>
              <input
                className={'DialogInput'}
                id={'title'}
                defaultValue={'New section'}
              />
            </fieldset>
            <fieldset className={'DialogFieldset'}>
              <label className={'DialogLabel'} htmlFor={'username'}>
                Username
              </label>
              <input
                className={'DialogInput'}
                id={'username'}
                defaultValue={'@peduarte'}
              />
            </fieldset>
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close asChild>
                <Button className={'DialogButton green'}>New section</Button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <IconButton className={'DialogIconButton'} aria-label={'Close'}>
                <Cross2Icon />
              </IconButton>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 20px 0;
  box-sizing: border-box;
`;

const CustomHeading = styled(Heading)`
  color: #3d3d3d;
  font-size: 16px;
`;

export default SectionCreator;
