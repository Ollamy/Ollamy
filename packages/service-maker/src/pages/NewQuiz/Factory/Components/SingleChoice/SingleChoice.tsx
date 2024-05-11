import type { ChangeEventHandler } from 'react';
import { useCallback, useEffect } from 'react';
import type { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, TextField } from '@radix-ui/themes';
import { answerActions } from 'services/api/routes/answer';

type QuestionType = { title: string; description: string };

function SingleChoice({ questionId }: FactoryComponentInterface) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });
  const { data: answerData } = questionActions.useGetAnswer({ id: questionId });

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();
  const { mutateAsync: addNewAnswer } = answerActions.useCreateAnswer();
  const { mutateAsync: updateAnswer } = answerActions.useUpdateAnswer();

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!questionData) {
        return;
      }

      const { name, value } = e.target;

      const updateData = (): QuestionType => {
        if (name === 'title') {
          return { title: value, description: questionData.description };
        }
        if (name === 'description') {
          return { title: questionData.title, description: value };
        }
        return { title: '', description: '' };
      };

      updateQuestion({
        id: questionId,
        updateQuestionModel: {
          ...updateData(),
        },
      });
    },
    [questionData, questionId, updateQuestion],
  );

  const handleChangeAnswer: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;

      updateAnswer({
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

  const handleAddAnswer = useCallback(() => {
    addNewAnswer({ createAnswerModel: { questionId, data: '', picture: '' } });
  }, [addNewAnswer, questionId]);

  useEffect(() => {
    console.log(answerData);
  }, [answerData]);

  return questionData ? (
    <Container>
      <TextField.Root
        name={'title'}
        placeholder={'Title'}
        onChange={handleChange}
        value={questionData.title}
      />
      <TextField.Root
        name={'description'}
        onChange={handleChange}
        placeholder={'Description'}
        value={questionData.description}
      />

      <h3>Answers</h3>
      {answerData?.map((elem, index) => (
        <TextField.Root
          key={elem.id}
          name={elem.id}
          defaultValue={elem.data}
          onChange={handleChangeAnswer}
          placeholder={`Answer ${index + 1}`}
        />
      ))}
      <Button onClick={handleAddAnswer} variant={'ghost'}>
        Add choices
      </Button>
    </Container>
  ) : (
    <p>Whesh elle est ou la data</p>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export default SingleChoice;
