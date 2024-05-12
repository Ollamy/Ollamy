import { FormEvent, useCallback, useState } from 'react';
import type { CreateSectionModel } from 'services/api/out';
import { sectionActions } from 'services/api/routes/section';
import styled from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { Heading, IconButton } from '@radix-ui/themes';

interface SectionCreatorProps {
  courseId: CreateSectionModel['courseId'];
}

function SectionCreator({ courseId }: SectionCreatorProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createNewSection } = sectionActions.useCreateSection();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;

      await createNewSection({
        createSectionModel: {
          courseId,
          title,
          description,
        },
      }).then(() => {
        setOpen(false);
      });
    },
    [courseId, createNewSection],
  );

  return (
    <Container>
      <CustomHeading>Sections</CustomHeading>
      <Dialog.Root open={open} onOpenChange={setOpen}>
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
            <CustomForm onSubmit={handleSubmit}>
              <CustomFieldset className={'DialogFieldset'}>
                <CustomLabel className={'DialogLabel'} htmlFor={'title'}>
                  Title
                </CustomLabel>
                <CustomInput
                  required
                  id={'title'}
                  name={'title'}
                  className={'DialogInput'}
                  placeholder={'Section title'}
                />
              </CustomFieldset>
              <CustomFieldset className={'DialogFieldset'}>
                <CustomLabel className={'DialogLabel'} htmlFor={'description'}>
                  Description
                </CustomLabel>
                <TextArea
                  required
                  id={'description'}
                  name={'description'}
                  className={'DialogTextarea'}
                  placeholder={'Section description…'}
                />
              </CustomFieldset>
              <ButtonContainer>
                <CustomButton type={'submit'} className={'DialogButton green'}>
                  New section
                </CustomButton>
              </ButtonContainer>
            </CustomForm>
            <Dialog.Close asChild>
              <CustomButton className={'DialogIconButton'} aria-label={'Close'}>
                <Cross2Icon />
              </CustomButton>
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

const CustomForm = styled.form``;

const CustomLabel = styled.label``;

const CustomInput = styled.input``;

const CustomFieldset = styled.fieldset``;

const CustomButton = styled.button``;

const TextArea = styled.textarea``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 25px;
`;

export default SectionCreator;
