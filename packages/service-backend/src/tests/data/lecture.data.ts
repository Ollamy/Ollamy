import { Lecture } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateLectureModel,
  IdLectureModel,
  UpdateLectureModel,
} from '@ollamy/backend/lecture/lecture.dto';

const lectureId = uuidv4();
const lectureId2 = uuidv4();

export const mockLectureData: CreateLectureModel = {
  lessonId: uuidv4(),
  data: 'test',
};

export const mockLectureDb: Lecture = {
  id: lectureId,
  lesson_id: mockLectureData.lessonId,
  data: mockLectureData.data,
};

export const mockLectureId: IdLectureModel = {
  id: lectureId,
};

export const mockLectureDb2: Lecture = {
  id: mockLectureId.id,
  lesson_id: mockLectureData.lessonId,
  data: 'test',
};

export const mockLectureDb3: Lecture = {
  id: lectureId2,
  lesson_id: mockLectureData.lessonId,
  data: '1',
};

export const mockLectureData2: UpdateLectureModel = {
  lessonId: mockLectureData.lessonId,
  data: '1',
  // updated lecture data
};

export const mockUpdatedLecture: Lecture = {
  id: lectureId2,
  lesson_id: mockLectureData.lessonId,
  data: '1',
  // updated lecture properties
};
