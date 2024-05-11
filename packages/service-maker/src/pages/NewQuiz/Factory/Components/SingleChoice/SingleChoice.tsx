import type { ChangeEventHandler } from 'react';
import { useCallback } from 'react';
import type { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, TextField } from '@radix-ui/themes';

type QuestionType = { title: string; description: string };

function SingleChoice({ lessonId, questionId }: FactoryComponentInterface) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });
  const { data: answerData } = questionActions.useGetAnswer({ id: questionId });

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();

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
          id: questionId,
          ...updateData(),
        },
      });
    },
    [questionData, questionId, updateQuestion],
  );

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
      {/*{data?.answers?.map((elem, index) => (*/}
      {/*  <TextField.Root*/}
      {/*    placeholder={`Answer ${index}`}*/}
      {/*    defaultValue={elem.data}*/}
      {/*    key={elem.id}*/}
      {/*    // onChange={(e) => setDescription(e.target.value)}*/}
      {/*  />*/}
      {/*))}*/}
      <Button variant={'ghost'}>Add choices</Button>
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
