import type { ChangeEventHandler } from 'react';
import { useCallback, useState } from 'react';
import { answerActions } from 'services/api/routes/answer';
import { questionActions } from 'services/api/routes/question';

interface UseManageTextAnswerProps {
  questionId: string;
}

export function formatString(input: string): string {
  return input.replace(/\s*\/\s*/g, ' / ');
}

const useManageTextAnswer = ({ questionId }: UseManageTextAnswerProps) => {
  const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
    undefined,
  );

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();
  const { mutateAsync: addNewAnswer } = answerActions.useCreateAnswer();
  const { mutateAsync: updateAnswer } = answerActions.useUpdateAnswer();
  const { mutateAsync: generateFakeAnswer } =
    answerActions.useCreateFalseAnswers();

  const handleChangeCorrectAnswer = async (id: string) => {
    await updateQuestion({
      id: questionId,
      updateQuestionModel: {
        trustAnswerId: id,
      },
    });
  };

  const handleChangeAnswerValue: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      async (e) => {
        const { name, value } = e.target;

        await updateAnswer({
          id: name,
          updateAnswerModel: {
            questionId,
            data: formatString(value),
            picture: '',
          },
        });
      },
      [questionId, updateAnswer],
    );

  const handleCreateNewAnswer = useCallback(async () => {
    await addNewAnswer({
      createAnswerModel: { questionId, data: '', picture: '' },
    });
  }, [addNewAnswer, questionId]);

  const handleCreateFalseAnswers = useCallback(
    async (numberWrongAnswers: number) => {
      await generateFakeAnswer({
        questionId,
        numberWrongAnswers,
      });
    },
    [generateFakeAnswer, questionId],
  );

  return {
    correctAnswer,
    setCorrectAnswer,
    handleCreateNewAnswer,
    handleChangeAnswerValue,
    handleChangeCorrectAnswer,
    handleCreateFalseAnswers,
  };
};

export default useManageTextAnswer;
