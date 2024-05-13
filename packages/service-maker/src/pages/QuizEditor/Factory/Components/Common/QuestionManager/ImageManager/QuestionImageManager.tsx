import { useCallback, useState } from 'react';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import useUploadPicture from 'pages/QuizEditor/Factory/hooks/useUploadPicture';
import type { GetQuestionModel } from 'services/api/out';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import { Button, IconButton } from '@radix-ui/themes';

interface QuestionImageManagerProps {
  questionId: string;
  data: GetQuestionModel | undefined;
}

function QuestionImageManager({ data, questionId }: QuestionImageManagerProps) {
  const [droppedImage, setDroppedImage] = useState<File | null>(null);

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();

  const updateImage = useCallback(
    async (pictureBase64: string) => {
      await updateQuestion({
        id: questionId,
        updateQuestionModel: {
          picture: pictureBase64,
        },
      });
    },
    [questionId, updateQuestion],
  );

  const { onUploadPicture } = useUploadPicture({
    droppedImage,
    updater: updateImage,
  });

  const handleRemovePicture = useCallback(async () => {
    await updateQuestion({
      id: questionId,
      updateQuestionModel: {
        picture: null,
      },
    });
  }, [questionId, updateQuestion]);

  return (
    <Container>
      <AddImageModal
        image={droppedImage}
        setImage={setDroppedImage}
        onUploadImage={onUploadPicture}
        CustomTriggerButton={
          data?.pictureId ? (
            <Image src={data.pictureId} />
          ) : (
            <Button variant={'surface'}>
              <UploadIcon />
              Upload Image
            </Button>
          )
        }
      />
      {data?.pictureId && (
        <CustomAlertDialog
          description={
            'This action cannot be undone. This will permanently delete this picture and remove your data from our servers.'
          }
          actionButtonValue={'Yes, delete picture'}
          TriggerButton={
            <IconButton color={'red'} variant={'surface'}>
              <TrashIcon />
            </IconButton>
          }
          onAction={handleRemovePicture}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 20px;

  width: 100%;
`;

const Image = styled.img`
  height: 100px;
  object-fit: cover;

  cursor: pointer;
`;

export default QuestionImageManager;
