import type { Status } from 'src/pages/courses/types';

export interface SectionResponse {
  id: string;
  courseId: string;
  title: string;
  description: string;
  status: Status;
}
