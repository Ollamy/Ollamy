import { useCallback } from 'react';
import { toBase64 } from 'utils/toBase64';

interface UseUploadPictureProps {
  droppedImage: File | null;
  updater: (pictureBase64: string) => void;
}

const useUploadPicture = ({ droppedImage, updater }: UseUploadPictureProps) => {
  const onUploadPicture = useCallback(async () => {
    try {
      if (!droppedImage) {
        return;
      }
      const base64 = await toBase64(droppedImage);
      if (!base64) {
        throw new Error('Error uploading image');
      }

      updater(base64.toString());
    } catch (error) {
      console.error(error);
    }
  }, [droppedImage, updater]);

  return { onUploadPicture };
};

export default useUploadPicture;
