import { useEffect } from 'react';
import QuizAnswerInput from 'components/input/QuizAnswerInput/QuizAnswerInput';
import QuizQuestionManager from 'pages/QuizEditor/Factory/Components/Common/QuestionManager/QuizQuestionManager';
import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import useManageTextAnswer from 'pages/QuizEditor/Factory/hooks/useManageTextAnswer';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, RadioGroup, Text } from '@radix-ui/themes';

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

  return (
    <Container>
      <QuizQuestionManager questionId={questionId} />
      <Text weight={'bold'}>Answer</Text>
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
              onChange={handleChangeAnswerValue}
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
