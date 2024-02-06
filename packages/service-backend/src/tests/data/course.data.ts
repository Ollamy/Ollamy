import {
  Course,
  Lesson,
  Picture,
  Section,
  User,
  UsertoCourse,
  UsertoLesson,
} from '@prisma/client';
import {
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
} from 'course/course.dto';

import { context } from 'tests/data/user.data';
import { v4 as uuidv4 } from 'uuid';

// Data

export const courseId = uuidv4();

export const createCourseData: CreateCourseModel = {
  title: 'title',
  description: 'desc',
  picture: 'data',
};

export const deleteCourseId: IdCourseModel = {
  id: courseId,
};

// Mock

export const mockUserId = {
  id: context.__user.id,
};

export const mockPictureDb: Picture = {
  id: uuidv4(),
  filename: 'data',
};

export const mockCourseDb: Course = {
  id: courseId,
  owner_id: context.__user.id,
  title: createCourseData.title,
  description: createCourseData.description,
  picture_id: mockPictureDb.id,
};

export const mockLastLessonDb = {
  lesson_id: uuidv4(),
} as UsertoLesson;

export const mockLastSectionDb = {
  section_id: uuidv4(),
} as Lesson;

export const mockUserToCourse: UsertoCourse = {
  id: uuidv4(),
  permission_course: [],
  permission_section: [],
  permission_lesson: [],
  course_id: '',
  user_id: context.__user.id,
  role_user: 'MEMBER',
  permission_user: [],
  last_lesson_id: mockLastLessonDb.lesson_id,
  last_section_id: mockLastSectionDb.section_id,
};

export const mockUpdateCourseData: UpdateCourseModel = {
  ownerId: context.__user.id,
  title: 'title',
  description: 'desc',
  picture: 'data',
};

export const mockSection1: Section = {
  id: uuidv4(),
  course_id: courseId,
  title: 'title',
  description: 'desc',
};

export const mockSection2: Section = {
  id: uuidv4(),
  course_id: courseId,
  title: 'title',
  description: 'desc',
};
