import { CreateLessonModel, IdLessonModel, UpdateLessonModel } from '@ollamy/backend/lesson/lesson.dto';
import { Lesson, Question, QuestionDifficulty } from '@prisma/client';
import { context } from 'tests/data/user.data';
import { v4 as uuidv4 } from 'uuid';

// Data

export const courseId = uuidv4();

export const mockLessonData: CreateLessonModel = {
    section_id: '1',
    title: 'lesson',
    description: 'desc',
  };
export const mockCreatedLesson: Lesson = {
    id: '123',
    section_id: mockLessonData.section_id,
    title: mockLessonData.title,
    description: mockLessonData.description,
};
export const mockUserId = '123';
export const mockContext = {
    __user: {
      id: mockUserId,
},
};

export const mockLessonData2: IdLessonModel = {
    id: '1',
  };

export const mockDeletedLesson: Lesson = {
    id: mockLessonData2.id,
    section_id: '1',
    title: 'title',
    description: 'desc',
};

export const mockLessonId = '123';
export const mockLesson: Lesson = {
  id: mockLessonId,
  section_id: '456',
  title: 'title',
  description: 'desc',
};

export const mockLessonUpdatedData: UpdateLessonModel = {
    title: 'Updated Lesson Title',
    description: 'Updated Lesson Description',
  };

export const mockUpdatedLesson: Lesson = {
    id: mockLessonId,
    section_id: '456',
    ...mockLessonUpdatedData,
};

export const mockLessonData3: UpdateLessonModel = {
    title: 'Updated Lesson Title',
    description: 'Updated Lesson Description',
    sectionId: '1',
  };

export const mockLessonQuestions: Question[] = [
    {
      id: '1',
      lesson_id: mockLessonId,
      title: 'Question 1',
      description: 'Description 1',
      trust_answer_id: '1',
      type_answer: 'TEXT',
      type_question: 'TEXT',
      difficulty: QuestionDifficulty.BEGINNER,
      picture_id: '1',
      points: 1,
      order: 0,
      // other question properties
    },
    {
      id: '2',
      lesson_id: mockLessonId,
      title: 'Question 2',
      description: 'Description 2',
      trust_answer_id: '1',
      type_answer: 'QUIZ',
      type_question: 'VIDEO',
      difficulty: QuestionDifficulty.ADVANCED,
      picture_id: '2',
      points: 2,
      order: 1,
      // other question properties
    },
    // other questions
];