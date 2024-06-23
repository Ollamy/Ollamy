import { Injectable } from '@nestjs/common';
import prisma from '../client';
import { StatisticOperation, StatisticType } from './statistic.dto';

@Injectable()
export class StatisticService {
  async grade(type: string, operation: string, ctx: any, courseId?: string) {
    let result;

    switch (type) {
      case StatisticType.STUDENT:
      case StatisticType.COURSE:
        if (!courseId) throw new Error('courseId is required');
        result = await this.getGradeByTypeOfCourses(operation, ctx.__user.id, courseId);
      case StatisticType.SECTION:
        result = await this.getGradeByTypeOfSection(operation, ctx.__user.id, courseId)
      case StatisticType.LESSON:
      default:
        break;
    }

    return result;
  }

  private async getGradeByTypeOfCourses(operation, user_id, courseId) {
    const { _avg, _max, _min } = await prisma.usertoCourse.aggregate({
      _avg: {
        score: true,
      },
      _max: {
        score: true,
      },
      _min: {
        score: true,
      },
      where: {
        course_id: courseId,
        AND: {
          course: {
            owner_id: user_id,
          }
        },
      },
    })

    const data = {
      average: _avg.score,
      max: _max.score,
      min: _min.score,
    }

    let result;
    if (operation !== StatisticOperation.ALL) {
      result = {
        [operation.toLowerCase()]: data[operation.toLowerCase()],
      };
    }
    return result ?? data;

  }

  private async getGradeByTypeOfSection(operation, user_id, courseId) {
    // get the avg of each Section in my course with prisma as a list of sections in one query
    const data = prisma.$queryRaw`
    SELECT AVG(score) as average, MAX(score) as max, MIN(score) as min
      FROM "UsertoSection"
      WHERE section_id IN(
        SELECT id
        FROM "Section"
        WHERE course_id = ${courseId}::uuid
      )`;

      console.log(data);
      return data;
  }
}
