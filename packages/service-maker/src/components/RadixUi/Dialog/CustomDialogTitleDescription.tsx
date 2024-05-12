import { type FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface CustomDialogTitleDescriptionProps {
  dialogTitle: string;
  dialogDescription: string;
  actionButtonValue: string;
  TriggerButton: React.ReactNode;
  createFunction: (title: string, description: string) => void;
}

function CustomDialogTitleDescription({
  dialogTitle,
  TriggerButton,
  createFunction,
  actionButtonValue,
  dialogDescription,
}: CustomDialogTitleDescriptionProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;

      createFunction(title, description);
      setOpen(false);
    },
    [createFunction],
  );

  return (
    <Container>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{TriggerButton}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={'DialogOverlay'} />
          <Dialog.Content className={'DialogContent'}>
            <Dialog.Title className={'DialogTitle'}>
              {dialogTitle}
              {/* Edit profile */}
            </Dialog.Title>
            <Dialog.Description className={'DialogDescription'}>
              {dialogDescription}
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
                  {actionButtonValue}
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

const Container = styled.div``;

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

export default CustomDialogTitleDescription;
