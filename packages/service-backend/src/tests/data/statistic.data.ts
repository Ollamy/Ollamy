import {
  CourseGradeStatisticModel,
  LessonGradeStatisticModel,
  SectionGradeStatisticModel,
  UserGradeStatisticModel,
} from 'statistic/statistic.dto';

export const AverageGrade = 75;
export const MinGrade = 0;
export const MaxGrade = 80;
export const mockCourseTitle = 'Ollamy jest test';
export const mockSectionTitle = 'Ollamy jest section1';
export const mockSection2Title = 'Ollamy jest section2';
export const mockLessonTitle = 'Ollamy jest lesson1';
export const mockLesson2Title = 'Ollamy jest lesson2';
export const mockLesson3Title = 'Ollamy jest lesson3';
export const mockFirstname = 'Ollamy';
export const mockLastname = 'Backend';

export const mockCourseStatisticData: CourseGradeStatisticModel = {
  average: AverageGrade,
  min: MinGrade,
  max: MaxGrade,
  title: mockCourseTitle,
};

export const mockSectionStatisticData: SectionGradeStatisticModel[] = [
  {
    average: AverageGrade,
    min: MinGrade,
    max: MaxGrade,
    title: mockSectionTitle,
  },
  {
    average: AverageGrade,
    min: MinGrade,
    max: MaxGrade,
    title: mockSection2Title,
  },
];

export const mockLessonStatisticData: LessonGradeStatisticModel[] = [
  {
    average: AverageGrade,
    min: MinGrade,
    max: MaxGrade,
    title: mockLessonTitle,
  },
  {
    average: AverageGrade,
    min: MinGrade,
    max: MaxGrade,
    title: mockLesson2Title,
  },
  {
    average: AverageGrade,
    min: MinGrade,
    max: MaxGrade,
    title: mockLesson3Title,
  },
];

export const mockUserStatisticData: UserGradeStatisticModel = {
  average: AverageGrade,
  min: MinGrade,
  max: MaxGrade,
  firstname: mockFirstname,
  lastname: mockLastname,
};
