import type { ColorValue } from 'react-native';

export interface CourseResponse {
  id: string;
  title: string;
  description: string;
  picture: string;
  ownerId: string;
  lastLessonId?: string;
  lastSectionId?: string;
}

export interface CourseInfo {
  id: string;
  title: string;
  picture: string;
  progress: number;
  color: ColorValue | string;
}
