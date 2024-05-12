import type { ReactElement } from 'react';
import FreeChoice from 'src/pages/courses/dashboard/lesson/quiz/factory/components/FreeChoice';
import MultipleChoice from 'src/pages/courses/dashboard/lesson/quiz/factory/components/MultipleChoice';
import SquareChoice from 'src/pages/courses/dashboard/lesson/quiz/factory/components/SquareChoice';
import type { GetAnswerRequest } from 'src/services/question/question.dto';
import { AnswerType } from 'src/services/question/question.dto';

export interface FactoryComponentInterface {
  setAnswer: (answer: string) => void;
  correctAnswer?: string;
  answers: GetAnswerRequest[];
}

export type FactoryComponent = ({ answers }: FactoryComponentInterface) => ReactElement;

export const quizFactory: Record<AnswerType, (props: FactoryComponentInterface) => ReactElement> = {
  [AnswerType.FREE_ANSWER]: FreeChoice,
  [AnswerType.MULTIPLE_CHOICE]: MultipleChoice,
  [AnswerType.SQUARE_CHOICE]: SquareChoice,
} as const;
