import MultipleChoice from 'pages/NewQuiz/Factory/Components/MultipleChoice/MultipleChoice';
import PictureChoice from 'pages/NewQuiz/Factory/Components/PictureChoise/PictureChoice';
import SingleChoice from 'pages/NewQuiz/Factory/Components/SingleChoice/SingleChoice';
import { QuestionType } from 'pages/NewQuiz/Factory/factory.types';
import { ReactElement } from 'react';
import { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';

export interface Factory {
  Component: ({
    lessonId,
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
