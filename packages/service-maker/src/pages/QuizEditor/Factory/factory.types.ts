export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface AnswerInformation {
  value: string;
  isCorrect: boolean;
  picture?: string;
}
