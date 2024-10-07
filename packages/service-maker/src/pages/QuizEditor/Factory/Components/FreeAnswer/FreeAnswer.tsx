import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import QuizAnswerInput from 'components/input/QuizAnswerInput/QuizAnswerInput';
import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';
import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import useManageTextAnswer from 'pages/QuizEditor/Factory/hooks/useManageTextAnswer';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, Flex, RadioGroup, Text } from '@radix-ui/themes';
import { answerActions } from 'services/api/routes/answer';

function FreeAnswer({ questionId }: FactoryComponentInterface) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });
  const { data: answerData } = questionActions.useGetQuestionAnswers({
    id: questionId,
  });

  const {
    correctAnswer,
    setCorrectAnswer,
    handleCreateNewAnswer,
    handleChangeAnswerValue,
    handleChangeCorrectAnswer,
  } = useManageTextAnswer({ questionId });

  const { mutateAsync: updateAnswer, isLoading: isUpdateAnswerLoading } =
    answerActions.useUpdateAnswer();
  const [currentState, setCurrentState] = useState<{
    id: string;
    data: string;
  }>({ id: '', data: '' });

  const handleAnswerDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentState((old) => ({ ...old, data: e.target.value }));
  };

  useEffect(() => {
    if (answerData && !answerData.length && !!handleCreateNewAnswer) {
      handleCreateNewAnswer();
    }
  }, [answerData, handleCreateNewAnswer]);

  useEffect(() => {
    if (
      answerData?.filter((elem) => elem.id === questionData?.trust_answer_id)
        .length
    ) {
      setCorrectAnswer(questionData?.trust_answer_id);
    } else if (answerData?.length) {
      const newCorrectAnswer = answerData[0].id;

      setCorrectAnswer(newCorrectAnswer);
      handleChangeCorrectAnswer(newCorrectAnswer);
    }
  }, [
    answerData,
    correctAnswer,
    setCorrectAnswer,
    handleChangeCorrectAnswer,
    questionData?.trust_answer_id,
  ]);

  useEffect(() => {
    if (answerData && answerData.length > 0) {
      setCurrentState({ data: answerData[0].data ?? '', id: answerData[0].id });
    }
  }, [questionData, answerData]);

  const hasChangesToSave = useMemo(() => {
    if (answerData && answerData?.length > 0) {
      return currentState.data !== answerData[0].data;
    }
    return false;
  }, [currentState, answerData, questionData]);

  const saveChanges = async () => {
    try {
      await updateAnswer({
        id: currentState.id,
        updateAnswerModel: {
          questionId,
          data: currentState.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <Flex justify="between">
        <Text weight={'bold'}>Answer</Text>
        <Button
          loading={isUpdateAnswerLoading}
          disabled={!hasChangesToSave}
          onClick={saveChanges}
          style={{ width: 'min-content' }}
        >
          Save
        </Button>
      </Flex>
      <RadioGroup.Root color={'green'} value={correctAnswer}>
        {answerData?.map(({ id, data }, index) => (
          <AnswerRow key={id}>
            <RadioGroup.Item
              value={id}
              onClick={() => handleChangeCorrectAnswer(id)}
            />
            <QuizAnswerInput
              key={id}
              name={id}
              answerId={id}
              removable={false}
              defaultValue={data}
              takesPictures={false}
              questionId={questionId}
              onChange={handleAnswerDataChange}
              placeholder={`Answer ${index + 1}`}
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

export default FreeAnswer;
