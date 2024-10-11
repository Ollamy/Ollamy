import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import styled from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import useUploadPicture from 'pages/QuizEditor/Factory/hooks/useUploadPicture';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';

interface FormInputs {
  title: string;
  description: string;
  picture: string;
}

interface CustomDialogTitleDescriptionProps<T> {
  dialogTitle: string;
  dialogDescription: string;
  actionButtonValue: string;
  TriggerButton: ReactNode;
  createFunction: (title: string, description: string, picture: string) => void;
  moreOptions?: T;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultTitleLabel?: string;
  defaultDescriptionLabel?: string;
  defaultPicture?: string;
  secondFieldType?: 'textArea' | 'input' | 'none';
}

function CourseCustomDialogTitleDescription<T>({
  dialogTitle,
  TriggerButton,
  createFunction,
  actionButtonValue,
  dialogDescription,
  defaultTitle = '',
  defaultPicture = '',
  defaultDescription = '',
  defaultTitleLabel = 'Title',
  defaultDescriptionLabel = 'Description',
  secondFieldType = 'textArea',
}: CustomDialogTitleDescriptionProps<T>) {
  const defaultValues = useMemo(
    () => ({
      title: defaultTitle,
      description: defaultDescription,
      picture: defaultPicture,
    }),
    [defaultTitle, defaultDescription, defaultPicture],
  );

  const [droppedImage, setDroppedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ defaultValues });
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState<string | null>(null);

  const updateImage = useCallback(
    async (pictureBase64: string) => {
      setPicture(pictureBase64);
    },
    [setPicture],
  );

  const { onUploadPicture } = useUploadPicture({
    droppedImage,
    updater: updateImage,
  });

  useEffect(() => {
    reset(defaultValues);
    setPicture(defaultPicture);
    setDroppedImage(null);
  }, [defaultPicture, reset, defaultValues]);

  const onSubmit = (data: FormInputs) => {
    createFunction(data.title, data.description, picture ?? '');
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
                  placeholder={'Title…'}
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
                      placeholder={'Description…'}
                    />
                  ) : (
                    <CustomInput
                      {...register('description', { required: true })}
                      id={'description'}
                      className={'DialogInput'}
                      placeholder={'Title'}
                    />
                  )}
                  {errors.description && <span>This field is required</span>}
                </CustomFieldset>
              )}
              <CustomFieldset className={'DialogFieldset'}>
                <ButtonContainer>
                  <ImageContainer>
                    <AddImageModal
                      image={droppedImage}
                      setImage={setDroppedImage}
                      onUploadImage={onUploadPicture}
                      CustomTriggerButton={
                        <Button variant={'surface'}>
                          <UploadIcon />
                          Upload Image
                        </Button>
                      }
                    />
                  </ImageContainer>
                </ButtonContainer>
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

const ImageContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 20px;

  width: 100%;
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

export default CourseCustomDialogTitleDescription;
