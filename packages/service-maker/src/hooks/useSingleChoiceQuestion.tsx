import { useState } from 'react';
import type { AnswerInformation } from 'pages/NewQuiz/Factory/factory.types';

interface EditAnswerProps {
  index: number;
  value?: string;
  isCorrect?: boolean;
  picture?: string;
}

const useSingleChoiceQuetion = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [answers, setAnswers] = useState<AnswerInformation[]>([]);

  const addAnswer = () => {
    setAnswers((old) => [
      ...old,
      {
        isCorrect: false,
        value: '',
      },
    ]);
  };

  const deleteAnswer = (index: number) => {
    setAnswers(answers.splice(index, 1));
  };

  const editAnswer = ({
    index,
    picture,
    isCorrect,
    value,
  }: EditAnswerProps) => {
    setAnswers((old) => {
      const elementAtIndex = old.at(index);
      if (!elementAtIndex) return old;

      return old.splice(index, 1, {
        isCorrect: isCorrect ?? elementAtIndex.isCorrect,
        value: value ?? elementAtIndex.value,
        picture: picture ?? elementAtIndex.picture,
      });
    });
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    addAnswer,
    editAnswer,
    deleteAnswer,
    answers,
  };
};

export default useSingleChoiceQuetion;
