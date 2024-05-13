import { useState } from 'react';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import DeleteModal from 'components/modal/DeleteModal/DeleteModal';
import { answerActions } from 'services/api/routes/answer';
import styled from 'styled-components';
import { toBase64 } from 'utils/toBase64';

import { TextField } from '@radix-ui/themes';
import type { RootProps } from '@radix-ui/themes/dist/cjs/components/text-field';

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

  const onUploadImage = async () => {
    try {
      if (!droppedImage) return;
      const base64 = await toBase64(droppedImage);
      if (!base64) throw new Error('Error uploading image');

      updateAnswer({
        id: answerId,
        updateAnswerModel: {
          picture: base64.toString(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteAnswer = async () => {
    try {
      await deleteAnswer({ idAnswerModel: { id: answerId } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Input {...props}>
      <IconsWrapper side="right">
        <AddImageModal
          image={droppedImage}
          setImage={setDroppedImage}
          onUploadImage={onUploadImage}
        />

        <DeleteModal
          title="Do you want to delete this answer ?"
          description="This action cannot be undone. This will permanently delete this answer and remove the data from our servers."
          onDeleteAnswer={onDeleteAnswer}
        />
      </IconsWrapper>
    </Input>
  );
}

// Just in order to use it below
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
