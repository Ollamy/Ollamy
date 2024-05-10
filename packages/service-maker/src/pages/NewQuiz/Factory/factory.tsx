import MultipleChoice from 'pages/NewQuiz/Factory/Components/MultipleChoice/MultipleChoice';
import PictureChoice from 'pages/NewQuiz/Factory/Components/PictureChoise/PictureChoice';
import SingleChoice from 'pages/NewQuiz/Factory/Components/SingleChoice/SingleChoice';
import { ReactElement } from 'react';

export interface Factory {
  name: string;
  label: string;
  Component: ReactElement;
}

const currentQuiz: Factory[] = [
  {
    name: 'multipleChoice',
    label: 'Multiple choice',
    Component: <MultipleChoice />,
  },
  {
    name: 'singleChoice',
    label: 'Single choice',
    Component: <SingleChoice />,
  },
  {
    name: 'pictureChoice',
    label: 'Picture choice',
    Component: <PictureChoice />,
  },
] as const;

export default currentQuiz;
