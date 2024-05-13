import { useCallback, useState } from 'react';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import type { GetQuestionModel } from 'services/api/out';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';
import { toBase64 } from 'utils/toBase64';

import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import { Button, IconButton } from '@radix-ui/themes';

interface QuestionImageManagerProps {
  questionId: string;
  data: GetQuestionModel | undefined;
}

function QuestionImageManager({ data, questionId }: QuestionImageManagerProps) {
  const [questionImage, setQuestionImage] = useState<File | null>(null);

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();

  const handleUploadImage = useCallback(async () => {
    try {
      if (!questionImage) {
        return;
      }
      const base64 = await toBase64(questionImage);
      if (!base64) {
        throw new Error('Error uploading image');
      }
      await updateQuestion({
        id: questionId,
        updateQuestionModel: {
          picture: base64.toString(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [questionId, questionImage, updateQuestion]);

  const handleRemovePicture = useCallback(async () => {
    await updateQuestion({
      id: questionId,
      updateQuestionModel: {
        // @ts-expect-error WAIT FOR YOYO - change data model
        picture: null,
      },
    });
  }, [questionId, updateQuestion]);

  return (
    <Container>
      <AddImageModal
        image={questionImage}
        setImage={setQuestionImage}
        onUploadImage={handleUploadImage}
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
