import type { ReactElement } from 'react';
import FreeAnswer from 'pages/QuizEditor/Factory/Components/FreeAnswer/FreeAnswer';
import type { FactoryComponentInterface } from 'pages/QuizEditor/Factory/Components/interface';
import MultipleChoice from 'pages/QuizEditor/Factory/Components/MultipleChoice/MultipleChoice';
import SquareChoice from 'pages/QuizEditor/Factory/Components/SquareChoice/SquareChoice';
import { GetQuestionModelTypeAnswerEnum } from 'services/api/out';

export interface Factory {
  Component: ({ questionId }: FactoryComponentInterface) => ReactElement;
  label: string;
}

const quizFactory: Record<GetQuestionModelTypeAnswerEnum, Factory> = {
  [GetQuestionModelTypeAnswerEnum.FreeAnswer]: {
    Component: FreeAnswer,
    label: 'Free question',
  },
  [GetQuestionModelTypeAnswerEnum.MultipleChoice]: {
    Component: MultipleChoice,
    label: 'Multiple choice question',
  },
  [GetQuestionModelTypeAnswerEnum.SquareChoice]: {
    Component: SquareChoice,
    label: 'Square question',
  },
  [GetQuestionModelTypeAnswerEnum.OrderChoice]: {
    Component: FreeAnswer,
    label: 'Order choice question',
  },
} as const;

export default quizFactory;
