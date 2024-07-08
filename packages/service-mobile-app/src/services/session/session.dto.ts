export interface CreateSessionResponse {
  currentQuestionId: string;
  sessionId: string;
}

export interface GetSessionResponse {
  currentQuestionId: string;
  correctAnswers: number;
  totalQuestions: number;
}

interface AnswerModel {
  id?: string;
  data?: string;
}

interface ValidateQuestionSession {
  questionId: string;
  answer: AnswerModel;
}

export interface ValidateQuestionSessionRequest {
  sessionId: string;
  body: ValidateQuestionSession;
}

export interface ValidateQuestionSessionResponse {
  success: boolean;
  nextQuestionId?: string | null;
  answerId: string;
  hp: number;
}
