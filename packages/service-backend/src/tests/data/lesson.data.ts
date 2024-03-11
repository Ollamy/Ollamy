import {
  CreateLessonModel,
  IdLessonModel,
  UpdateLessonModel,
} from '@ollamy/backend/lesson/lesson.dto';
import { Lesson, Question, QuestionDifficulty } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Data

export const courseId = uuidv4();
export const mockLessonId = uuidv4();

export const mockLessonData: CreateLessonModel = {
  section_id: uuidv4(),
  title: 'lesson',
  description: 'desc',
};
export const mockCreatedLesson: Lesson = {
  id: mockLessonId,
  section_id: mockLessonData.section_id,
  title: mockLessonData.title,
  description: mockLessonData.description,
};

export const mockLessonData2: IdLessonModel = {
  id: mockLessonId,
};

export const mockDeletedLesson: Lesson = {
  id: mockLessonData2.id,
  section_id: uuidv4(),
  title: 'title',
  description: 'desc',
};

export const mockLesson: Lesson = {
  id: mockLessonId,
  section_id: uuidv4(),
  title: 'title',
  description: 'desc',
};

export const mockLessonUpdatedData: UpdateLessonModel = {
  title: 'Updated Lesson Title',
  description: 'Updated Lesson Description',
};

export const mockUpdatedLesson: Lesson = {
  id: mockLessonId,
  section_id: uuidv4(),
  ...mockLessonUpdatedData,
};

export const mockLessonData3: UpdateLessonModel = {
  title: 'Updated Lesson Title',
  description: 'Updated Lesson Description',
  sectionId: mockLessonData.section_id,
};

export const mockLessonQuestions: Question[] = [
  {
    id: uuidv4(),
    lesson_id: mockLessonId,
    title: 'Question 1',
    description: 'Description 1',
    trust_answer_id: uuidv4(),
    type_answer: 'TEXT',
    type_question: 'TEXT',
    difficulty: QuestionDifficulty.BEGINNER,
    picture_id: uuidv4(),
    points: 1,
    order: "a0",
    // other question properties
  },
  {
    id: uuidv4(),
    lesson_id: mockLessonId,
    title: 'Question 2',
    description: 'Description 2',
    trust_answer_id: uuidv4(),
    type_answer: 'QUIZ',
    type_question: 'VIDEO',
    difficulty: QuestionDifficulty.ADVANCED,
    picture_id: uuidv4(),
    points: 2,
    order: "a1",
    // other question properties
  },
  // other questions
];
