import { LessonStatus, Question, UsertoLesson } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateQuestionModel,
  IdQuestionModel,
  UpdateQuestionModel,
  validateAnswerModel,
} from '@ollamy/backend/question/question.dto';
import { context } from './user.data';

export const questionId = uuidv4();
export const correctAnswerId = uuidv4();
const incorrectAnswerId = uuidv4();
const lessonId = uuidv4();
export const mockQuestionId2 = uuidv4();

export const mockQuestionData: CreateQuestionModel = {
  lesson_id: lessonId,
  title: 'Question Title',
  description: 'Question Description',
  type_answer: 'TEXT',
  type_question: 'TEXT',
  data: 'test',
  between: undefined,
};

export const mockQuestionId: IdQuestionModel = {
  id: questionId,
};

export const mockQuestionDb: Question = {
  id: mockQuestionId.id,
  lesson_id: lessonId,
  title: '2',
  type_answer: 'TEXT',
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: "a0",
};

export const mockQuestionDb2: Question = {
  id: mockQuestionId2,
  lesson_id: lessonId,
  title: '2',
  type_answer: 'TEXT',
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: "a0",
};

export const mockQuestionId3 = uuidv4();
export const mockQuestionData2: UpdateQuestionModel = {
  lesson_id: lessonId,
  title: 'test',
  description: 'desc',
  trust_answer_id: correctAnswerId,
};

export const mockBody: validateAnswerModel = {
  question_id: questionId,
  answer_id: correctAnswerId,
};

export const mockQuestionDb3: Question = {
  id: mockBody.question_id,
  lesson_id: lessonId,
  title: '2',
  type_answer: 'TEXT',
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: "a0",
};

export const mockBodyIncorrect: validateAnswerModel = {
  question_id: questionId,
  answer_id: incorrectAnswerId,
};
export const mockQuestionDb4: Question = {
  id: mockBody.question_id,
  lesson_id: lessonId,
  title: '2',
  type_answer: 'TEXT',
  type_question: 'TEXT',
  trust_answer_id: correctAnswerId,
  description: '1',
  picture_id: uuidv4(),
  points: 0,
  difficulty: 'BEGINNER',
  order: "a0",
};

export const mockUserLesson: UsertoLesson = {
  id: uuidv4(),
  user_id: context.__user.id,
  lesson_id: lessonId,
  score: 1,
  complete_lecture: false,
  complete_question: false,
  status: LessonStatus.NOT_STARTED,
  created_at: new Date(),
  updated_at: new Date(),
};
