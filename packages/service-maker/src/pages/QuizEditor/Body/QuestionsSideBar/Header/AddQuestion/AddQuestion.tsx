import { useCallback, useEffect, useState } from 'react';
import { CreateQuestionModelTypeAnswerEnum } from 'services/api/out';
import { questionActions } from 'services/api/routes/question';
import { styled } from 'styled-components';

import 'styles/dropdownMenu.css';

const answerTypeMap: Record<CreateQuestionModelTypeAnswerEnum, string> = {
  [CreateQuestionModelTypeAnswerEnum.FreeAnswer]: 'free',
  [CreateQuestionModelTypeAnswerEnum.MultipleChoice]: 'multiple choice',
  [CreateQuestionModelTypeAnswerEnum.SquareChoice]: 'square',
};

interface AddQuestionProps {
  lessonId: string;
}

function AddQuestion({ lessonId }: AddQuestionProps) {
  const [typeAnswer, setTypeAnswer] = useState<
    CreateQuestionModelTypeAnswerEnum | undefined
  >(undefined);

  const { mutateAsync: createNewQuestion } =
    questionActions.useCreateQuestion();

  useEffect(() => {}, [typeAnswer]);

  const handleCreate = useCallback(
    async (title: string, description: string) => {
      if (!typeAnswer) {
        // eslint-disable-next-line no-console
        console.error('No answer selected');
        return;
      }

      createNewQuestion({
        createQuestionModel: {
          lessonId,
          title,
          description,
          typeAnswer,
          typeQuestion: 'TEXT',
          picture: '',
          difficulty: 'BEGINNER',
          points: 0,
        },
      });
    },
    [createNewQuestion, lessonId, typeAnswer],
  );

  return <Container>Hello</Container>;
}

const Container = styled.div``;

export default AddQuestion;
