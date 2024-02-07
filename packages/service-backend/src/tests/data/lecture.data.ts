import { Discussion, Lecture, UserDiscussions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateDiscussionModel } from '@ollamy/backend/discussion/discussion.dto';
import { CreateLectureModel, IdLectureModel, UpdateLectureModel } from '@ollamy/backend/lecture/lecture.dto';

export const userId = uuidv4();

export const mockLectureData: CreateLectureModel = {
    lessonId: '123',
    data: 'test',
};

export const mockLectureDb: Lecture = {
    id: '1',
    lesson_id: mockLectureData.lessonId,
    data: mockLectureData.data,
};

export const mockLectureId: IdLectureModel = {
    id: '123',
};

export const mockLectureDb2: Lecture = {
    id: mockLectureId.id,
    lesson_id: '123',
    data: 'test',
};

export const mockLectureId2 = '123';
export const mockLectureDb3: Lecture = {
    id: mockLectureId2,
    lesson_id: '123',
    data: '1',
};

export const mockLectureData2: UpdateLectureModel = {
      lessonId: mockLectureId2,
      data: '1',
      // updated lecture data
};

export const mockUpdatedLecture: Lecture = {
      id: mockLectureId2,
      lesson_id: mockLectureId2,
      data: '1',
      // updated lecture properties
};