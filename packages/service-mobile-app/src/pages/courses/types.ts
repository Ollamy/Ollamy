export enum Status {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface CourseSection {
  id: string;
  title: string;
  status: Status;
}

export interface Lesson {
  id: string;
  title: string;
  status: Status;
}
