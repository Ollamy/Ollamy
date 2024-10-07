import { AnswerType, Status, Question, UsertoLesson } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateQuestionModel,
  IdQuestionModel,
  UpdateQuestionModel,
  ValidateAnswerModel,
} from '@ollamy/backend/question/question.dto';
import { context } from './user.data';

export const questionId = uuidv4();
export const correctAnswerId = uuidv4();
const incorrectAnswerId = uuidv4();
const lessonId = uuidv4();
export const mockQuestionId2 = uuidv4();

export const mockQuestionData: CreateQuestionModel = {
  lessonId: lessonId,
  title: 'Question Title',
  description: 'Question Description',
  typeAnswer: AnswerType.FREE_ANSWER,
  typeQuestion: 'TEXT',
  trustAnswerId: correctAnswerId,
};

export const mockQuestionId: IdQuestionModel = {
  id: questionId,
};

export const mockQuestionDb: Question = {
  id: mockQuestionId.id,
  lesson_id: lessonId,
  title: '2',
  type_answer: AnswerType.FREE_ANSWER,
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: 'a0',
  time: 0,
  bonus: false,
};

export const mockQuestionDb2: Question = {
  id: mockQuestionId2,
  lesson_id: lessonId,
  title: '2',
  type_answer: AnswerType.FREE_ANSWER,
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: 'a0',
  time: 0,
  bonus: false,
};

export const mockQuestionId3 = uuidv4();
export const mockQuestionData2: UpdateQuestionModel = {
  lessonId: lessonId,
  title: 'test',
  description: 'desc',
  trustAnswerId: correctAnswerId,
  typeAnswer: AnswerType.FREE_ANSWER,
  typeQuestion: 'TEXT',
};

export const mockBody: ValidateAnswerModel = {
  questionId: questionId,
  answerId: correctAnswerId,
};

export const mockQuestionDb3: Question = {
  id: mockBody.questionId,
  lesson_id: lessonId,
  title: '2',
  type_answer: AnswerType.FREE_ANSWER,
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: 'a0',
  time: 0,
  bonus: false,
};

export const mockBodyIncorrect: ValidateAnswerModel = {
  questionId: questionId,
  answerId: incorrectAnswerId,
  data: 'incorrect',
};
export const mockQuestionDb4: Question = {
  id: mockBody.questionId,
  lesson_id: lessonId,
  title: '2',
  type_answer: AnswerType.FREE_ANSWER,
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: 'a0',
  time: 0,
  bonus: false,
};

export const mockUserLesson: UsertoLesson = {
  id: uuidv4(),
  user_id: context.__user.id,
  lesson_id: lessonId,
  score: 1,
  complete_lecture: false,
  complete_question: false,
  status: Status.NOT_STARTED,
  created_at: new Date(),
  updated_at: new Date(),
};
