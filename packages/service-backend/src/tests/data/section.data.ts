import { Discussion, Lecture, Lesson, Prisma, Question, Section, UserDiscussions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateDiscussionModel } from '@ollamy/backend/discussion/discussion.dto';
import { CreateLectureModel, IdLectureModel, UpdateLectureModel } from '@ollamy/backend/lecture/lecture.dto';
import { CreateQuestionModel, IdQuestionModel, UpdateQuestionModel, validateAnswerModel } from '@ollamy/backend/question/question.dto';
import { CreateSectionModel, IdSectionModel, UpdateSectionModel } from '@ollamy/backend/section/section.dto';

export const userId = uuidv4();

export const mockSectionData: CreateSectionModel = {
    courseId: '123',
    title: 'Section Title',
    description: 'Section Description',
};
export const mockSectionDb: Section = {
    id: '456',
    course_id: mockSectionData.courseId,
    title: mockSectionData.title,
    description: mockSectionData.description,
};

export const mockSectionData2: IdSectionModel = {
    id: '123',
};

export const mockSectionDb2: Section = {
    id: mockSectionData2.id,
    course_id: '123',
    title: 'Section Title',
    description: 'Section Description',
    // other properties
};

export const mockError: Prisma.PrismaClientKnownRequestError =
new Prisma.PrismaClientKnownRequestError('error', {
  code: '1',
  clientVersion: '1',
});

export const mockSectionId = '123';
export const mockSectionData3: UpdateSectionModel = {
  title: 'Updated Section Title',
  description: 'Updated Section Description',
  courseId: '456',
};

export const mockSectionDb3: Section = {
    id: mockSectionId,
    course_id: '456',
    title: 'Section Title',
    description: 'Section Description',
  };

export const mockLessonDb: Lesson[] = [
    {
      id: '1',
      section_id: mockSectionId,
      title: 'Lesson 1',
      description: 'Lesson 1 Description',
    },
    {
      id: '2',
      section_id: mockSectionId,
      title: 'Lesson 2',
      description: 'Lesson 2 Description',
    },
];