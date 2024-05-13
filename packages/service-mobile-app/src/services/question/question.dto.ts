export enum AnswerType {
  FREE_ANSWER = 'FREE_ANSWER',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SQUARE_CHOICE = 'SQUARE_CHOICE',
}

export interface GetQuestionResponse {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  typeAnswer: AnswerType;
  typeQuestion: 'TEXT';
  trustAnswerId: string;
  pictureId?: string;
  difficulty?: string;
  order: number;
}

export interface GetAnswerRequest {
  id: string;
  questionId: string;
  data?: string;
  picture?: string;
}

export interface ValidateAnswerRequest {
  questionId: string;
  answerId?: string;
  data?: string;
}

export interface ValidateAnswerResponse {
  success: boolean;
  answer: string;
  end: boolean;
  nextQuestionId?: string | undefined;
  points: number;
  hp: number;
}
