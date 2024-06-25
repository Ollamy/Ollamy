import { Test } from '@nestjs/testing';
import { context } from './data/user.data';
import {
  mockCourseStatisticData,
  mockLessonStatisticData,
  mockSectionStatisticData,
  mockUserStatisticData,
} from './data/statistic.data';
import { StatisticService } from 'statistic/statistic.service';
import { StatisticOperation, StatisticType } from 'statistic/statistic.dto';
import { courseId } from './data/course.data';

describe('createSession', () => {
  let statisticService: StatisticService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StatisticService],
    }).compile();

    statisticService = moduleRef.get<StatisticService>(StatisticService);
  });

  it('should return a list of course statistics', async () => {
    jest
      .spyOn(StatisticService, 'getGradeByTypeOfCourse')
      .mockResolvedValue([mockCourseStatisticData]);

    const result = await statisticService.grade(
      StatisticType.COURSE,
      StatisticOperation.ALL,
      context,
      courseId,
    );

    expect(StatisticService.getGradeByTypeOfCourse).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockCourseStatisticData]);
  });

  it('should return a list of section statistics', async () => {
    jest
      .spyOn(StatisticService, 'getGradeByTypeOfSection')
      .mockResolvedValue(mockSectionStatisticData);

    const result = await statisticService.grade(
      StatisticType.SECTION,
      StatisticOperation.ALL,
      context,
      courseId,
    );

    expect(StatisticService.getGradeByTypeOfSection).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSectionStatisticData);
  });

  it('should return a list of lesson statistics', async () => {
    jest
      .spyOn(StatisticService, 'getGradeByTypeOfLesson')
      .mockResolvedValue(mockLessonStatisticData);

    const result = await statisticService.grade(
      StatisticType.LESSON,
      StatisticOperation.ALL,
      context,
      courseId,
    );

    expect(StatisticService.getGradeByTypeOfLesson).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockLessonStatisticData);
  });

  it('should return a list of user statistics', async () => {
    jest
      .spyOn(StatisticService, 'getGradeByTypeOfUser')
      .mockResolvedValue([mockUserStatisticData]);

    const result = await statisticService.grade(
      StatisticType.STUDENT,
      StatisticOperation.ALL,
      context,
      courseId,
    );

    expect(StatisticService.getGradeByTypeOfUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockUserStatisticData]);
  });
});
