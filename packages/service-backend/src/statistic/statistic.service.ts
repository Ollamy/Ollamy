import { Injectable } from '@nestjs/common';
import prisma from 'client';
import {
  CourseGradeStatisticModel,
  GradeStatisticModel,
  LessonGradeStatisticModel,
  SectionGradeStatisticModel,
  StatisticOperation,
  StatisticType,
  UserGradeStatisticModel,
} from './statistic.dto';

@Injectable()
export class StatisticService {
  async grade(
    type: StatisticType,
    operation: StatisticOperation,
    ctx: any,
    courseId?: string,
  ): Promise<GradeStatisticModel[]> {
    if (!courseId) throw new Error('courseId is required');

    let result = undefined;

    switch (type) {
      case StatisticType.STUDENT:
        result = await this.getGradeByTypeOfUser(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      case StatisticType.COURSE:
        result = await this.getGradeByTypeOfCourses(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      case StatisticType.SECTION:
        result = await this.getGradeByTypeOfSection(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      case StatisticType.LESSON:
        result = await this.getGradeByTypeOfLesson(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      default:
        break;
    }

    return result;
  }

  private async getGradeByTypeOfCourses(
    operation: StatisticOperation,
    userId: string,
    courseId: string,
  ): Promise<CourseGradeStatisticModel[]> {
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
            owner_id: userId,
          },
        },
      },
    });

    const { title } = await prisma.course.findUnique({
      select: {
        title: true,
      },
      where: {
        id: courseId,
        owner_id: userId,
      },
    });
    const data: CourseGradeStatisticModel = {
      average: _avg.score,
      max: _max.score,
      min: _min.score,
      title,
    };

    let result = undefined;
    if (operation !== StatisticOperation.ALL) {
      result = {
        [operation.toLowerCase()]: data[operation.toLowerCase()],
      };
    }
    return [result ?? data];
  }

  private async getGradeByTypeOfSection(
    operation: StatisticOperation,
    userId: string,
    courseId: string,
  ): Promise<SectionGradeStatisticModel[]> {
    const data: SectionGradeStatisticModel[] = await prisma.$queryRaw`
    SELECT AVG(uts.score)::INTEGER as average, MAX(uts.score) as max, MIN(uts.score) as min, sct.title
      FROM "UsertoSection" uts
      INNER JOIN "Section" sct on uts.section_id = sct.id
      WHERE uts.section_id IN(
        SELECT sct.id
        FROM "Section" sct
        INNER JOIN "Course" cs on cs.owner_id = ${userId}::uuid
        WHERE sct.course_id = ${courseId}::uuid
      )
    GROUP BY uts.section_id, sct.title
    `;

    if (!data) throw new Error('Unable to retrieve data');
    let result;

    if (operation !== StatisticOperation.ALL) {
      result = (data as Array<object>).map((section) => {
        return {
          [operation.toLowerCase()]: section[operation.toLowerCase()],
          title: section['title'],
        };
      });
    }
    return result ?? data;
  }

  private async getGradeByTypeOfLesson(
    operation: StatisticOperation,
    userId: string,
    courseId: string,
  ): Promise<LessonGradeStatisticModel[]> {
    const data: LessonGradeStatisticModel[] = await prisma.$queryRaw`
    SELECT AVG(utl.score)::INTEGER as average, MAX(utl.score) as max, MIN(utl.score) as min, ls.title
      FROM "UsertoLesson" utl
      INNER JOIN "Lesson" ls on utl.lesson_id = ls.id
      WHERE utl.lesson_id IN(
        SELECT ls.id
        FROM "Lesson" ls
        WHERE ls.section_id IN (
            SELECT sct.id
            FROM "Section" sct
            INNER JOIN "Course" cs on cs.owner_id = ${userId}::uuid
            WHERE sct.course_id = ${courseId}::uuid
            )
      )
    GROUP BY utl.lesson_id, ls.title`;

    if (!data) throw new Error('Unable to retrieve data');
    let result;

    if (operation !== StatisticOperation.ALL) {
      result = (data as Array<object>).map((lesson) => {
        return {
          [operation.toLowerCase()]: lesson[operation.toLowerCase()],
          title: lesson['title'],
        };
      });
    }
    return result ?? data;
  }

  private async getGradeByTypeOfUser(
    operation: StatisticOperation,
    userId: string,
    courseId: string,
  ): Promise<UserGradeStatisticModel[]> {
    const data: UserGradeStatisticModel[] = await prisma.$queryRaw`
   SELECT AVG(utc.score)::INTEGER as average, MAX(utc.score) as max, MIN(utc.score) as min, us.firstname , us.lastname
      FROM "UsertoCourse" utc
      INNER JOIN "User" us on utc.user_id = us.id
      WHERE utc.course_id IN(
        SELECT cs.id
        FROM "Course" cs
        WHERE cs.id = ${courseId}::uuid
        AND cs.owner_id = ${userId}::uuid
      )
    GROUP BY utc.id, us.id`;

    if (!data) throw new Error('Unable to retrieve data');
    let result;

    if (operation !== StatisticOperation.ALL) {
      result = (data as Array<object>).map((user) => {
        return {
          [operation.toLowerCase()]: user[operation.toLowerCase()],
          firstname: user['firstname'],
          lastname: user['lastname'],
        };
      });
    }
    return result ?? data;
  }
}
