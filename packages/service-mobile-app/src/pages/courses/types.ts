export enum LessonStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface CourseSection {
  id: string;
  title: string;
  status: LessonStatus;
}

export interface Lesson {
  id: string;
  title: string;
  status: LessonStatus;
}
