import type { ChangeEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import {
  Button,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
} from '@radix-ui/themes';
import { answerActions } from 'services/api/routes/answer';
import QuizAnswerInput from 'components/input/QuizAnswerInput/QuizAnswerInput';
import AddImageModal from 'components/modal/AddImageModal/AddImageModal';
import { toBase64 } from 'utils/toBase64';
import { UploadIcon } from '@radix-ui/react-icons';

type QuestionType = { title: string; description: string };

function SingleChoice({ questionId }: FactoryComponentInterface) {
  const [questionImage, setQuestionImage] = useState<File | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(undefined);
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });
  const { data: answerData } = questionActions.useGetAnswer({ id: questionId });

  const { mutateAsync: updateQuestion } = questionActions.useUpdateQuestion();
  const { mutateAsync: addNewAnswer } = answerActions.useCreateAnswer();
  const { mutateAsync: updateAnswer } = answerActions.useUpdateAnswer();

  useEffect(() => {
    console.log('answers data: ', answerData);
    setCorrectAnswer(questionData?.trust_answer_id);
  }, [questionData]);

  const handleUploadImage = async () => {
    try {
      console.log(questionImage);
      if (!questionImage) return;

      const base64 = await toBase64(questionImage);

      console.log('base 64 :', base64?.toString());

      if (!base64) throw new Error('Error uploading image');
      updateQuestion({
        id: questionId,
        updateQuestionModel: {
          picture: base64.toString(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  const handlecorrectAnswerChange = async (id: string) => {
    try {
      updateQuestion({
        id: questionId,
        updateQuestionModel: {
          trustAnswerId: id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return questionData ? (
    <Container>
      {questionData.pictureId ? (
        <Skeleton>
          <QuestionImage src={questionData.pictureId} />
        </Skeleton>
      ) : (
        <AddImageModal
          image={questionImage}
          setImage={setQuestionImage}
          onUploadImage={handleUploadImage}
          customTriggerButton={
            <Button variant="surface">
              <UploadIcon />
              Upload Image
            </Button>
          }
        />
      )}
      <fieldset>
        <label>Title</label>
        <TextField.Root
          name={'title'}
          placeholder={'Title'}
          onChange={handleChange}
          value={questionData.title}
        />
      </fieldset>

      <fieldset>
        <label>Description</label>
        <TextField.Root
          name={'description'}
          onChange={handleChange}
          placeholder={'Description'}
          value={questionData.description}
        />
      </fieldset>

      <h3>Answers</h3>

      <RadioGroup.Root color="green" value={correctAnswer}>
        {answerData?.map((elem, index) => (
          <AnswerRow key={elem.id}>
            <RadioGroup.Item
              value={elem.id}
              onClick={() => handlecorrectAnswerChange(elem.id)}
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

const QuestionImage = styled.img`
  height: 100px;
  object-fit: cover;
  align-self: center;

  cursor: pointer;

  border: 1px solid black;
`;

const AnswerRow = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

export default SingleChoice;
