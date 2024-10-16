import {
  CreateLessonModel,
  IdLessonModel,
  LessonModel,
  UpdateLessonModel,
} from '@ollamy/backend/lesson/lesson.dto';
import {
  AnswerType,
  Lesson,
  Question,
  QuestionDifficulty,
  Status,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { mockUserLesson } from './question.data';

// Data

export const courseId = uuidv4();
export const mockLessonId = uuidv4();

export const mockLessonData: CreateLessonModel = {
  sectionId: uuidv4(),
  title: 'lesson',
  description: 'desc',
};
export const mockCreatedLesson: Lesson = {
  id: mockLessonId,
  section_id: mockLessonData.sectionId,
  title: mockLessonData.title,
  description: mockLessonData.description,
  order: 'a0',
};

export const mockLessonData2: IdLessonModel = {
  id: mockLessonId,
};

export const mockDeletedLesson: Lesson = {
  id: mockLessonData2.id,
  section_id: uuidv4(),
  title: 'title',
  description: 'desc',
  order: 'a0',
};

export const mockLesson: Lesson = {
  id: mockLessonId,
  section_id: uuidv4(),
  title: 'title',
  description: 'desc',
  order: 'a0',
};

export const mockLessonExtended = {
  id: mockLessonId,
  section_id: uuidv4(),
  title: 'title',
  description: 'desc',
  order: 'a0',
  UsertoLesson: [
    {
      status: mockUserLesson.status,
    },
  ],
};

export const mockLessonUpdatedData: UpdateLessonModel = {
  title: 'Updated Lesson Title',
  description: 'Updated Lesson Description',
};

export const mockUpdatedLesson: Lesson = {
  id: mockLessonId,
  section_id: uuidv4(),
  ...(mockLessonUpdatedData as { title: string; description: string }),
  order: 'a0',
};

export const mockLessonData3: UpdateLessonModel = {
  title: 'Updated Lesson Title',
  description: 'Updated Lesson Description',
  sectionId: mockLessonData.sectionId,
};

export const mockLessonQuestions: Question[] = [
  {
    id: uuidv4(),
    lesson_id: mockLessonId,
    title: 'Question 1',
    description: 'Description 1',
    trust_answer_id: uuidv4(),
    type_answer: AnswerType.FREE_ANSWER,
    type_question: 'TEXT',
    difficulty: QuestionDifficulty.BEGINNER,
    picture_id: uuidv4(),
    points: 1,
    order: 'a0',
    time: undefined,
    bonus: false,
    // other question properties
  },
  {
    id: uuidv4(),
    lesson_id: mockLessonId,
    title: 'Question 2',
    description: 'Description 2',
    trust_answer_id: uuidv4(),
    type_answer: AnswerType.SQUARE_CHOICE,
    type_question: 'VIDEO',
    difficulty: QuestionDifficulty.ADVANCED,
    picture_id: uuidv4(),
    points: 2,
    order: 'a1',
    time: 20,
    bonus: false,
    // other question properties
  },
  // other questions
];

export const mockGetLesson: LessonModel = {
  id: mockLesson.id,
  title: mockLesson.title,
  description: mockLesson.description,
  status: mockUserLesson.status,
  numberOfLectures: 1,
  numberOfQuestions: 1,
  order: 'a0',
};
