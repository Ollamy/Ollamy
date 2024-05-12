import type { ReactElement } from 'react';
import type { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';
import PictureChoice from 'pages/NewQuiz/Factory/Components/PictureChoise/PictureChoice';
import SingleChoice from 'pages/NewQuiz/Factory/Components/SingleChoice/SingleChoice';
import { QuestionType } from 'pages/NewQuiz/Factory/factory.types';

export interface Factory {
  Component: ({
    questionId,
  }: FactoryComponentInterface) => ReactElement;
  label: string;
}

const quizFactory: Record<QuestionType, Factory> = {
  [QuestionType.TEXT]: {
    Component: SingleChoice,
    label: 'Single choice',
  },
  [QuestionType.IMAGE]: {
    Component: PictureChoice,
    label: 'Picture choice',
  },
} as const;

export default quizFactory;
