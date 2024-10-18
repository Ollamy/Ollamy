import { useCallback, useState } from 'react';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import useUploadPicture from 'pages/QuizEditor/Factory/hooks/useUploadPicture';
import { answerActions } from 'services/api/routes/answer';
import styled from 'styled-components';

import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton, TextField } from '@radix-ui/themes';
import type { RootProps } from '@radix-ui/themes/dist/cjs/components/text-field';

interface QuizAnswerInputProps extends RootProps {
  answerId: string;
  questionId: string;
  takesPictures?: boolean;
  removable?: boolean;
}

function QuizAnswerInput({
  answerId,
  questionId,
  takesPictures = true,
  removable = true,
  ...props
}: QuizAnswerInputProps) {
  const { mutateAsync: updateAnswer } = answerActions.useUpdateAnswer();
  const { mutateAsync: deleteAnswer } = answerActions.useRemoveAnswer();

  const [droppedImage, setDroppedImage] = useState<File | null>(null);

  const updateImage = useCallback(
    async (pictureBase64: string) => {
      await updateAnswer({
        id: answerId,
        updateAnswerModel: {
          picture: pictureBase64,
        },
      });
    },
    [answerId, updateAnswer],
  );

  const { onUploadPicture } = useUploadPicture({
    droppedImage,
    updater: updateImage,
  });

  const onDeleteAnswer = useCallback(async () => {
    try {
      await deleteAnswer({ idAnswerModel: { id: answerId } });
    } catch (error) {
      console.error(error);
    }
  }, [answerId, deleteAnswer]);

  return (
    <Input {...props}>
      <IconsWrapper side={'right'}>
        {takesPictures && (
          <AddImageModal
            image={droppedImage}
            setImage={setDroppedImage}
            onUploadImage={onUploadPicture}
          />
        )}
        {removable && (
          <CustomAlertDialog
            description={
              'This action cannot be undone. This will permanently delete this answer and remove the data from our servers.'
            }
            actionButtonValue={'Yes, delete answer'}
            TriggerButton={
              <IconButton size={'1'} color={'red'} variant={'surface'}>
                <TrashIcon />
              </IconButton>
            }
            onAction={onDeleteAnswer}
          />
        )}
      </IconsWrapper>
    </Input>
  );
}

const Input = styled(TextField.Root)`
  flex: 1;
`;

const IconsWrapper = styled(TextField.Slot)`
  display: none;

  ${Input}:hover & {
    display: flex;
    align-items: center;
  }
`;

export default QuizAnswerInput;
