export enum StatisticType {
  STUDENT = 'STUDENT',
  COURSE = 'COURSE',
  SECTION = 'SECTION',
  LESSON = 'LESSON',
}

export enum StatisticOperation {
  AVERAGE = 'AVERAGE',
  MAX = 'MAX',
  MIN = 'MIN',
  ALL = 'ALL',
}

export interface SessionGradeStatistic {
  correctAnswers: number,
  totalQuestions: number,
  timeTakenInSeconds: number,
}

export interface GradeStatisticModel {
  lessonId: string;
  title: string;
  average: number;
  min: number;
  max: number;
  sessions: SessionGradeStatistic[]
}

export type GetUserCourseStatisticResponse = GradeStatisticModel[]