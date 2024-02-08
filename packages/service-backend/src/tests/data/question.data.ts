import { Discussion, Lecture, Question, UserDiscussions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateDiscussionModel } from '@ollamy/backend/discussion/discussion.dto';
import { CreateLectureModel, IdLectureModel, UpdateLectureModel } from '@ollamy/backend/lecture/lecture.dto';
import { CreateQuestionModel, IdQuestionModel, UpdateQuestionModel, validateAnswerModel } from '@ollamy/backend/question/question.dto';

export const userId = uuidv4();

export const mockQuestionData: CreateQuestionModel = {
    lessonId: '123',
    title: 'Question Title',
    description: 'Question Description',
    typeAnswer: 'TEXT',
    typeQuestion: 'TEXT',
    data: 'test',
    order: 0,
};

export const mockQuestionId: IdQuestionModel = {
    id: '123',
};

export const mockQuestionDb: Question = {
    id: mockQuestionId.id,
    lesson_id: '1',
    title: '2',
    type_answer: 'TEXT',
    type_question: 'TEXT',
    trust_answer_id: '1',
    description: '1',
    picture_id: '',
    points: 0,
    difficulty: 'BEGINNER',
    order: 0,
};

export const mockQuestionId2 = '123';
export const mockQuestionDb2: Question = {
      id: mockQuestionId2,
      lesson_id: '1',
      title: '2',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      trust_answer_id: '1',
      description: '1',
      picture_id: '1',
      points: 0,
      difficulty: 'BEGINNER',
      order: 0,
};

export const mockQuestionId3 = '98ea81ae-678a-4cf5-bd88-2e6f43429c24';
export const mockQuestionData2: UpdateQuestionModel = {
  lessonId: 'a4dca408-a53d-4fb5-b566-e2fb3ec90078',
  title: 'test',
  description: 'desc',
  trustAnswerId: '1',
};

export const correctAnswerId = uuidv4();
const incorrectAnswerId = uuidv4();
const questionId = uuidv4();
const lessonId = uuidv4();


export const mockBody: validateAnswerModel = {
    questionId: questionId,
    answerId: correctAnswerId,
};

export const mockQuestionDb3: Question = {
    id: mockBody.questionId,
    lesson_id: lessonId,
    title: '2',
    type_answer: 'TEXT',
    type_question: 'TEXT',
    trust_answer_id: correctAnswerId,
    description: '1',
    picture_id: '1',
    points: 0,
    difficulty: 'BEGINNER',
    order: 0,
};

export const mockBodyIncorrect: validateAnswerModel = {
    questionId: questionId,
    answerId: incorrectAnswerId,
};
export const mockQuestionDb4: Question = {
    id: mockBody.questionId,
    lesson_id: lessonId,
    title: '2',
    type_answer: 'TEXT',
    type_question: 'TEXT',
    trust_answer_id: correctAnswerId,
    description: '1',
    picture_id: '1',
    points: 0,
    difficulty: 'BEGINNER',
    order: 0,
};