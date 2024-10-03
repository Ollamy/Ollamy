import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import QuizAnswerInput from 'components/input/QuizAnswerInput/QuizAnswerInput';
import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';
import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import useManageTextAnswer from 'pages/QuizEditor/Factory/hooks/useManageTextAnswer';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, Flex, RadioGroup, Skeleton, Text } from '@radix-ui/themes';
import { answerActions } from 'services/api/routes/answer';
import { deepEqual } from 'pages/QuizEditor/Factory/Components/SquareChoice/SquareChoice';

type MultipleChoiceState = {
  trustAnswerId: string;
  answers: {
    id: string;
    data: string;
  }[];
};

function MultipleChoice({ questionId }: FactoryComponentInterface) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });
  const { data: answerData } = questionActions.useGetQuestionAnswers({
    id: questionId,
  });

  const { mutateAsync: updateQuestion, isLoading: isUpdateQuestionLoading } =
    questionActions.useUpdateQuestion();
  const { mutateAsync: updateAnswer, isLoading: isUpdateAnswerLoading } =
    answerActions.useUpdateAnswer();

  const {
    correctAnswer,
    setCorrectAnswer,
    handleCreateNewAnswer,
    handleChangeAnswerValue,
    handleChangeCorrectAnswer,
  } = useManageTextAnswer({ questionId });

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

  const [currentState, setCurrentState] = useState<MultipleChoiceState>({
    trustAnswerId: '',
    answers: [],
  });

  const handleAnswerDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name: id, value } = e.target;

    setCurrentState((old) => {
      return {
        ...old,
        answers: old.answers.map((a) =>
          a.id === id
            ? {
                ...a,
                data: value,
              }
            : a,
        ),
      };
    });
  };

  const handleCorrectAnswerChange = (id: string) => {
    setCurrentState((old) => {
      return {
        ...old,
        trustAnswerId: id,
      };
    });
  };

  const saveChanges = async () => {
    try {
      await updateQuestion({
        id: questionId,
        updateQuestionModel: {
          trustAnswerId: currentState?.trustAnswerId,
        },
      });
      await Promise.all(
        currentState.answers.map(async (answer, idx) => {
          await updateAnswer({
            id: currentState.answers[idx].id,
            updateAnswerModel: {
              questionId,
              data: answer.data,
            },
          });
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurrentState((old) => ({
      ...old,
      trustAnswerId: questionData?.trust_answer_id ?? '',
      answers: (answerData ?? []).map(({ id, data }) => ({
        id,
        data: data ?? '',
      })),
    }));
  }, [questionData, answerData]);

  const hasChangesToSave = useMemo(
    () =>
      deepEqual(currentState, {
        trustAnswerId: questionData?.trust_answer_id,
        answers: answerData?.map(({ order, ...data }) => data),
      }),
    [currentState, answerData, questionData],
  );

  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <Flex justify="between">
        <Text weight={'bold'}>Answer</Text>
        <Button
          loading={isUpdateAnswerLoading}
          disabled={hasChangesToSave}
          onClick={saveChanges}
          style={{ width: 'min-content' }}
        >
          Save
        </Button>
      </Flex>
      <ButtonContainer>
        <CustomButton
          variant={'ghost'}
          loading={!answerData}
          onClick={handleCreateNewAnswer}
          disabled={answerData && answerData.length >= 4}
        >
          Add choices
        </CustomButton>
      </ButtonContainer>
      {correctAnswer && (
        <RadioGroup.Root color={'green'} defaultValue={correctAnswer}>
          {answerData?.length ? (
            answerData.map(({ id, data }, index) => (
              <AnswerRow key={id}>
                <RadioGroup.Item
                  value={id}
                  onClick={() => handleCorrectAnswerChange(id)}
                />
                <QuizAnswerInput
                  key={id}
                  name={id}
                  answerId={id}
                  defaultValue={data}
                  takesPictures={false}
                  questionId={questionId}
                  onChange={handleAnswerDataChange}
                  placeholder={`Answer ${index + 1}`}
                />
              </AnswerRow>
            ))
          ) : (
            <>
              <Skeleton width="100%" height="30px" />
              <Skeleton width="100%" height="30px" />
              <Skeleton width="100%" height="30px" />
              <Skeleton width="100%" height="30px" />
            </>
          )}
        </RadioGroup.Root>
      )}
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
