import type { Status } from 'src/pages/courses/types';

export interface LessonResponse {
  description: string;
  id: string;
  status: Status;
  title: string;
}

export interface GetLessonQuestionsRequest {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  typeAnswer: string;
  typeQuestion: string;
  order: number;
}

export interface GetLessonLectureRequest {
  id: string;
  data: string;
}
