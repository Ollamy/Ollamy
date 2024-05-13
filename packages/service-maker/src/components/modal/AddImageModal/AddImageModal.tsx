import { Dispatch, FormEventHandler, ReactNode, useCallback } from 'react';
import { styled } from 'styled-components';

import 'styles/dialog.css';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, ImageIcon, UploadIcon } from '@radix-ui/react-icons';
import { IconButton, Text } from '@radix-ui/themes';

interface AddImageModalProps {
  image: File | null;
  setImage: Dispatch<React.SetStateAction<File | null>>;
  onUploadImage: () => void;
  CustomTriggerButton?: ReactNode;
}

function AddImageModal({
  image,
  setImage,
  onUploadImage,
  CustomTriggerButton,
}: AddImageModalProps) {
  const handleFileChange: FormEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if ('files' in event.target) {
        setImage((event.target.files as FileList)[0]);
      }
    },
    [],
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {CustomTriggerButton || (
          <IconButton variant={'ghost'} color={'indigo'}>
            <ImageIcon />
          </IconButton>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={'DialogOverlay'} />
        <Dialog.Content className={'DialogContent'}>
          <Dialog.Title className={'DialogTitle'}>
            Upload a new picture
          </Dialog.Title>
          <ImageDropZone onChange={handleFileChange}>
            <UploadIcon height={24} width={24} />
            <Text>Drag & drop any file here</Text>
            <Text>
              or <Text color={'violet'}>browse file</Text> from device
            </Text>
            <Text color={'gray'}>Max. 2Mo</Text>
            <ImageInput
              type={'file'}
              className={'Input'}
              id={'image'}
              accept={'image/*'}
            />
          </ImageDropZone>
          {image && (
            <Text>
              {image.name} | {(image.size / 1e6).toFixed(2)} Mo
            </Text>
          )}
          <Container>
            <Dialog.Close asChild>
              <CustomButton
                className={'DialogButton green'}
                onClick={onUploadImage}
              >
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Container>
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

const ImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;

  transform: translate(0, -16px);
`;

const ImageDropZone = styled.div`
  margin-top: 24px;

  position: relative;
  width: 400px;
  min-height: 80px;
  padding: 16px 16px 20px 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 8px;

  border: 1px dashed black;
  border-radius: 8px;
`;

const CustomButton = styled.button``;

const Container = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: flex-end;
`;

export default AddImageModal;
