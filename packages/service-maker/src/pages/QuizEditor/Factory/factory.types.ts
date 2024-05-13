export enum QuestionType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface QuestionInformation {
  title: string;
  description: string;
  points: number;
  picture: string;
  type: QuestionType;
  difficulty: Difficulty;
  answers: AnswerInformation[];
}

export interface AnswerInformation {
  value: string;
  isCorrect: boolean;
  picture?: string;
}
