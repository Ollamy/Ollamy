import { Lesson, Prisma, Section, Status, UsertoSection } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateSectionModel,
  IdSectionModel,
  UpdateSectionModel,
} from '@ollamy/backend/section/section.dto';
import { userId } from './user.data';

export const courseId = uuidv4();

export const sectionId = uuidv4();

export const mockSectionData: CreateSectionModel = {
  courseId: courseId,
  title: 'Section Title',
  description: 'Section Description',
};
export const mockSectionDb: Section = {
  id: sectionId,
  course_id: mockSectionData.courseId,
  title: mockSectionData.title,
  description: mockSectionData.description,
  order: 'a0',
};

export const mockUserToSectionDb: UsertoSection = {
  id: sectionId,
  user_id: userId,
  section_id: sectionId,
  status: Status.IN_PROGRESS,
  updated_at: new Date(),
  created_at: new Date(),
};

export const mockSectionData2: IdSectionModel = {
  id: sectionId,
};

export const mockSectionDb2: Section = {
  id: mockSectionData2.id,
  course_id: courseId,
  title: 'Section Title',
  description: 'Section Description',
  order: 'a0',

  // other properties
};

export const mockError: Prisma.PrismaClientKnownRequestError =
  new Prisma.PrismaClientKnownRequestError('error', {
    code: '1',
    clientVersion: '1',
  });

export const mockSectionData3: UpdateSectionModel = {
  title: 'Updated Section Title',
  description: 'Updated Section Description',
  courseId: courseId,
};

export const mockSectionDb3: Section = {
  id: sectionId,
  course_id: courseId,
  title: 'Section Title',
  description: 'Section Description',
  order: 'a0',
};

export const mockLessonDb: Lesson[] = [
  {
    id: uuidv4(),
    section_id: sectionId,
    title: 'Lesson 1',
    description: 'Lesson 1 Description',
    order: 'a0',
  },
  {
    id: uuidv4(),
    section_id: sectionId,
    title: 'Lesson 2',
    description: 'Lesson 2 Description',
    order: 'a1',
  },
];
