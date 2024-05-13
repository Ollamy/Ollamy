import QuestionImageManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/ImageManager/QuestionImageManager';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Separator, Text, TextField } from '@radix-ui/themes';

interface QuizQuestionManagerProps {
  questionId: string;
}

function QuizQuestionManager({ questionId }: QuizQuestionManagerProps) {
  const { data } = questionActions.useQuestion({
    id: questionId,
  });

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();

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
      <QuestionImageManager questionId={questionId} data={data} />
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

export default QuizQuestionManager;
