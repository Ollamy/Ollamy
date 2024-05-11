import { RootProps } from '@radix-ui/themes/dist/cjs/components/text-field';
import styled from 'styled-components';
import { TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { toBase64 } from 'utils/toBase64';
import { answerActions } from 'services/api/routes/answer';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import DeleteModal from 'components/modal/DeleteModal/DeleteModal';

interface QuizAnswerInputProps extends RootProps {
  answerId: string;
  questionId: string;
}

const QuizAnswerInput = ({
  answerId,
  questionId,
  ...props
}: QuizAnswerInputProps) => {
  const { mutateAsync: updateAnswer } = answerActions.useUpdateAnswer();
  const { mutateAsync: deleteAnswer } = answerActions.useRemoveAnswer();

  const [droppedImage, setDroppedImage] = useState<File | null>(null);

  const onUploadImage = async () => {
    try {
      if (!droppedImage) return;
      console.log('uploading image...');

      const base64 = await toBase64(droppedImage);

      console.log('base 64 :', base64?.toString());

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
          droppedImage={droppedImage}
          setDroppedImage={setDroppedImage}
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
};

// Just in order to use it below
const Input = styled(TextField.Root)``;

const IconsWrapper = styled(TextField.Slot)`
  display: none;

  ${Input}:hover & {
    display: flex;
    align-items: center;
  }
`;

export default QuizAnswerInput;
