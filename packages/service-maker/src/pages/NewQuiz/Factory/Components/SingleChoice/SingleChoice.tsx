import type { ChangeEventHandler } from 'react';
import { useCallback } from 'react';
import type { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Button, TextField } from '@radix-ui/themes';

type QuestionType = { title: string; description: string };

function SingleChoice({ lessonId, questionId }: FactoryComponentInterface) {
  const { data } = questionActions.useQuestion({ id: questionId });
  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!data) {
        return;
      }

      const { name, value } = e.target;

      const updateData = (): QuestionType => {
        if (name === 'title') {
          return { title: value, description: data.description };
        }
        if (name === 'description') {
          return { title: data.title, description: value };
        }
        return { title: '', description: '' };
      };

      updateQuestion({
        id: questionId,
        updateQuestionModel: {
          ...data,
          ...updateData(),
        },
      });
    },
    [data, lessonId, questionId, updateQuestion],
  );

  return data ? (
    <Container>
      <TextField.Root
        name={'title'}
        value={data.title}
        placeholder={'Title'}
        onChange={handleChange}
      />
      <TextField.Root
        name={'description'}
        onChange={handleChange}
        value={data.description}
        placeholder={'Description'}
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
