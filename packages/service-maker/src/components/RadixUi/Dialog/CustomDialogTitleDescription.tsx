import {
  ChangeEvent,
  type FormEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ChangeHandler } from 'react-hook-form';

interface CustomDialogTitleDescriptionProps {
  dialogTitle: string;
  dialogDescription: string;
  actionButtonValue: string;
  TriggerButton: React.ReactNode;
  createFunction: (title: string, description: string) => void;
  onCancel?: () => void;
}

function CustomDialogTitleDescription({
  dialogTitle,
  onCancel,
  TriggerButton,
  createFunction,
  actionButtonValue,
  dialogDescription,
}: CustomDialogTitleDescriptionProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      createFunction(title, description);
      setOpen(false);
    },
    [createFunction, description, title],
  );

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('ICI');
      setTitle(event.target.value);
    },
    [],
  );

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      setDescription(event.target.value);
    },
    [],
  );

  const handleOpenChange = useCallback(() => {
    setOpen((prev) => {
      if (prev && onCancel) {
        onCancel();
      }

      return !prev;
    });
  }, [onCancel]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{TriggerButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={'DialogOverlay'} />
        <Dialog.Content className={'DialogContent'}>
          <Dialog.Title className={'DialogTitle'}>{dialogTitle}</Dialog.Title>
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
                value={title}
                onChange={handleTitleChange}
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
                value={description}
                onChange={handleDescriptionChange}
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
  );
}

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
