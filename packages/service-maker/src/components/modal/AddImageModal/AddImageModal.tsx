import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, ImageIcon, UploadIcon } from '@radix-ui/react-icons';
import { IconButton, Text } from '@radix-ui/themes';
import { styled } from 'styled-components';

interface AddImageModal {
  droppedImage: File | null;
  setDroppedImage: React.Dispatch<React.SetStateAction<File | null>>;
  onUploadImage: () => void;
}

const AddImageModal = ({
  droppedImage,
  setDroppedImage,
  onUploadImage,
}: AddImageModal) => {
  const handleFileChange: React.FormEventHandler<HTMLDivElement> = (e) => {
    if ('files' in e.target) {
      setDroppedImage((e.target.files as FileList)[0]);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton variant="ghost" color="indigo">
          <ImageIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add image</Dialog.Title>
          <ImageDropZone onChange={handleFileChange}>
            <UploadIcon height={24} width={24} />
            <Text>Drag & drop any file here</Text>
            <Text>
              or <Text color="violet">browse file</Text> from device
            </Text>
            <Text color='gray'>Max. 2Mo</Text>
            <ImageInput
              type="file"
              className="Input"
              id="image"
              accept="image/*"
            />
          </ImageDropZone>

          {droppedImage && <Text>{droppedImage.name} | {(droppedImage.size / 1e6).toFixed(2)} Mo</Text>}

          <div
            style={{
              display: 'flex',
              marginTop: 12,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={onUploadImage}>
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

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
  padding: 16px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 8px;

  border: 1px dashed black;
  border-radius: 8px;
`;

export default AddImageModal;
