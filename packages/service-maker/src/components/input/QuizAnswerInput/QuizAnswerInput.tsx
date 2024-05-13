import { useCallback, useState } from 'react';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import DeleteModal from 'components/modal/DeleteModal/DeleteModal';
import { answerActions } from 'services/api/routes/answer';
import styled from 'styled-components';

import { TextField } from '@radix-ui/themes';
import type { RootProps } from '@radix-ui/themes/dist/cjs/components/text-field';
import useUploadPicture from 'pages/QuizEditor/Factory/hooks/useUploadPicture';

interface QuizAnswerInputProps extends RootProps {
  answerId: string;
  questionId: string;
}

function QuizAnswerInput({
  answerId,
  questionId,
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
  }, []);

  return (
    <Input {...props}>
      <IconsWrapper side={'right'}>
        <AddImageModal
          image={droppedImage}
          setImage={setDroppedImage}
          onUploadImage={onUploadPicture}
        />

        <DeleteModal
          title={'Do you want to delete this answer ?'}
          description={
            'This action cannot be undone. This will permanently delete this answer and remove the data from our servers.'
          }
          onDeleteAnswer={onDeleteAnswer}
        />
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
