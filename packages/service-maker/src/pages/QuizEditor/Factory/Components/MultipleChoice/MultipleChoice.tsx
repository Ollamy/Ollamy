import {
  type ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import QuizAnswerInput from 'components/input/QuizAnswerInput/QuizAnswerInput';
import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';
import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import { answerActions } from 'services/api/routes/answer';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, RadioGroup, Text } from '@radix-ui/themes';

function MultipleChoice({ questionId }: FactoryComponentInterface) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });
  const { data: answerData } = questionActions.useGetQuestionAnswers({
    id: questionId,
  });

  const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
    undefined,
  );

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();
  const { mutateAsync: addNewAnswer } = answerActions.useCreateAnswer();
  const { mutateAsync: updateAnswer } = answerActions.useUpdateAnswer();

  const handleCorrectAnswerChange = async (id: string) => {
    await updateQuestion({
      id: questionId,
      updateQuestionModel: {
        trustAnswerId: id,
      },
    });
  };

  const handleChangeAnswer: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const { name, value } = e.target;

      await updateAnswer({
        id: name,
        updateAnswerModel: {
          questionId,
          data: value,
          picture: '',
        },
      });
    },
    [questionId, updateAnswer],
  );

  const handleAddAnswer = useCallback(async () => {
    await addNewAnswer({
      createAnswerModel: { questionId, data: '', picture: '' },
    });
  }, [addNewAnswer, questionId]);

  useEffect(() => {
    if (
      answerData?.filter((elem) => elem.id === questionData?.trust_answer_id)
        .length
    ) {
      setCorrectAnswer(questionData?.trust_answer_id);
    } else if (answerData?.length) {
      const newCorrectAnswer = answerData[0].id;

      setCorrectAnswer(newCorrectAnswer);
      handleCorrectAnswerChange(newCorrectAnswer);
    }
  }, [
    answerData,
    correctAnswer,
    handleCorrectAnswerChange,
    questionData?.trust_answer_id,
  ]);

  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <Text weight={'bold'}>Answer</Text>
      <ButtonContainer>
        <CustomButton
          variant={'ghost'}
          onClick={handleAddAnswer}
          loading={!answerData}
          disabled={answerData && answerData.length >= 4}
        >
          Add choices
        </CustomButton>
      </ButtonContainer>
      <RadioGroup.Root color={'green'} value={correctAnswer}>
        {answerData?.map((elem, index) => (
          <AnswerRow key={elem.id}>
            <RadioGroup.Item
              value={elem.id}
              onClick={() => handleCorrectAnswerChange(elem.id)}
            />
            <QuizAnswerInput
              answerId={elem.id}
              questionId={questionId}
              name={elem.id}
              defaultValue={elem.data}
              onChange={handleChangeAnswer}
              placeholder={`Answer ${index + 1}`}
              key={elem.id}
            />
          </AnswerRow>
        ))}
      </RadioGroup.Root>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: 100%;
  height: 100%;
`;

const AnswerRow = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

const CustomButton = styled(Button)`
  margin-right: 0;
`;

export default MultipleChoice;
