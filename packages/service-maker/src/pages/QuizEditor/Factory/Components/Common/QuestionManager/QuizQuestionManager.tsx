import { useCallback, useState } from 'react';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';
import { toBase64 } from 'utils/toBase64';

import { UploadIcon } from '@radix-ui/react-icons';
import { Button, Separator, Text, TextField } from '@radix-ui/themes';

interface QuizQuestionManagerProps {
  questionId: string;
}

function QuizQuestionManager({ questionId }: QuizQuestionManagerProps) {
  const [questionImage, setQuestionImage] = useState<File | null>(null);

  const { data } = questionActions.useQuestion({
    id: questionId,
  });
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

  return (
    <Container>
      <InputContainer>
        <Text weight={'bold'}>Title</Text>
        <TextField.Root placeholder={'Question title'} />
      </InputContainer>
      <InputContainer>
        <Text weight={'bold'}>Description</Text>
        <TextField.Root placeholder={'Question description'} />
      </InputContainer>
      <Separator size={'4'} />
      <ImageContainer>
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
      </ImageContainer>
      <Separator size={'4'} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: 100%;

  padding: 20px 0;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const Image = styled.img`
  height: 100px;
  object-fit: cover;

  cursor: pointer;
`;

export default QuizQuestionManager;
