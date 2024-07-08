import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface FormInputs {
  title: string;
  description: string;
}

interface CustomDialogTitleDescriptionProps<T> {
  dialogTitle: string;
  dialogDescription: string;
  actionButtonValue: string;
  TriggerButton: ReactNode;
  createFunction: (title: string, description: string, moreOptions?: T) => void;
  moreOptions?: T;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultTitleLabel?: string;
  defaultDescriptionLabel?: string;
  secondFieldType?: 'textArea' | 'input' | 'none';
}

function CustomDialogTitleDescription<T>({
  dialogTitle,
  TriggerButton,
  createFunction,
  actionButtonValue,
  dialogDescription,
  moreOptions,
  defaultTitle = '',
  defaultDescription = '',
  defaultTitleLabel = 'Title',
  defaultDescriptionLabel = 'Description',
  secondFieldType = 'textArea',
}: CustomDialogTitleDescriptionProps<T>) {
  const defaultValues = useMemo(
    () => ({
      title: defaultTitle,
      description: defaultDescription,
    }),
    [defaultTitle, defaultDescription],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ defaultValues });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: FormInputs) => {
    createFunction(data.title, data.description, moreOptions);
    setOpen(false);
  };

  return (
    <Container>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{TriggerButton}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={'DialogOverlay'} />
          <Dialog.Content className={'DialogContent'}>
            <Dialog.Title className={'DialogTitle'}>{dialogTitle}</Dialog.Title>
            <Dialog.Description className={'DialogDescription'}>
              {dialogDescription}
            </Dialog.Description>
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
              <CustomFieldset className={'DialogFieldset'}>
                <CustomLabel className={'DialogLabel'} htmlFor={'title'}>
                  {defaultTitleLabel}
                </CustomLabel>
                <CustomInput
                  {...register('title', { required: true })}
                  id={'title'}
                  className={'DialogInput'}
                  placeholder={'Section title'}
                />
                {errors.title && <span>This field is required</span>}
              </CustomFieldset>
              {secondFieldType !== 'none' && (
                <CustomFieldset className={'DialogFieldset'}>
                  <CustomLabel
                    className={'DialogLabel'}
                    htmlFor={'description'}
                  >
                    {defaultDescriptionLabel}
                  </CustomLabel>
                  {secondFieldType === 'textArea' ? (
                    <TextArea
                      {...register('description', { required: true })}
                      id={'description'}
                      className={'DialogTextarea'}
                      placeholder={'Section description…'}
                    />
                  ) : (
                    <CustomInput
                      {...register('description', { required: true })}
                      id={'description'}
                      className={'DialogInput'}
                      placeholder={'Section title'}
                    />
                  )}
                  {errors.description && <span>This field is required</span>}
                </CustomFieldset>
              )}
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
