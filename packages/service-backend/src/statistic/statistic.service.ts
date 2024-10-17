import { ConflictException, Injectable } from '@nestjs/common';
import { Role, Status } from '@prisma/client';
import prisma from 'client';
import {
  CourseGradeStatisticModel,
  CourseUserStatistic,
  GradeStatisticModel,
  LessonGradeStatisticModel,
  SectionGradeStatisticModel,
  StatisticOperation,
  StatisticType,
  UserGradeStatisticModel,
} from './statistic.dto';

@Injectable()
export class StatisticService {

  async user(ctx: any, courseId: string): Promise<CourseUserStatistic[]> {
    const result = await StatisticService.getGradeForStudent(
      ctx.__user.id,
      courseId,
    );

    return result as CourseUserStatistic[];
  }

  async grade(
    type: StatisticType,
    operation: StatisticOperation,
    ctx: any,
    courseId?: string,
  ): Promise<GradeStatisticModel[]> {
    let result = undefined;

    switch (type) {
      case StatisticType.STUDENT:
        result = await StatisticService.getGradeByTypeOfUser(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      case StatisticType.COURSE:
        result = await StatisticService.getGradeByTypeOfCourse(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      case StatisticType.SECTION:
        result = await StatisticService.getGradeByTypeOfSection(
          operation,
          ctx.__user.id,
          courseId,
        );
        break;
      case StatisticType.LESSON:
        result = await StatisticService.getGradeByTypeOfLesson(
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

  static async getGradeForStudent(id: any, courseId: string) {
    const data = await prisma.userSession.findMany({
      where: {
        user_id: id,
        course_id: courseId,
        status: Status.COMPLETED,
      },
      select: {
        lesson_id: true,
        correct_answers: true,
        total_questions: true,
        created_at: true,
        end_date: true,
        lesson: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!data) throw new ConflictException('No session found');

    const lessonResults = data.reduce((acc, session) => {
      const lessonId = session.lesson_id;
      const existingLesson = acc.get(lessonId);
      if (!existingLesson) {
        acc.set(lessonId, {
          lessonId,
          title: session.lesson.title,
          average: 0,
          max: 0,
          min: 0,
          sessions: [],
        });
      }

      acc.get(lessonId).sessions.push({
        correctAnswers: session.correct_answers,
        totalQuestions: session.total_questions,
        timeTakenInSeconds: Math.round((session.end_date.getTime() - session.created_at.getTime()) / 1000),
      });

      const lessonData = acc.get(lessonId);
      lessonData.average = Math.round(
        (lessonData.average * (acc.get(lessonId).sessions.length - 1) + session.correct_answers) /
        acc.get(lessonId).sessions.length
      );
      lessonData.max = Math.max(lessonData.max, session.correct_answers);
      lessonData.min = Math.min(lessonData.min, session.correct_answers);

      return acc;
    }, new Map());

    return Array.from(lessonResults.values());
  }


  static async getGradeByTypeOfCourse(
    operation: StatisticOperation,
    userId: string,
    courseId: string,
  ): Promise<CourseGradeStatisticModel[]> {
    const data: CourseGradeStatisticModel[] = await prisma.$queryRaw`
  SELECT AVG(utc.score)::INTEGER as average, MAX(utc.score) as max, MIN(utc.score) as min, cs.title
     FROM "UsertoCourse" utc
     INNER JOIN "User" us on utc.user_id = us.id
     INNER JOIN "Course" cs on cs.id = ${courseId}::uuid
     AND cs.owner_id = ${userId}::uuid
   GROUP BY cs.title`;

    if (!data) throw new Error('Unable to retrieve data');
    let result;

    if (operation !== StatisticOperation.ALL) {
      result = (data as Array<object>).map((course) => {
        return {
          [operation.toLowerCase()]: course[operation.toLowerCase()],
          title: course['title'],
        };
      });
    }
    return result ?? data;
  }

  static async getGradeByTypeOfSection(
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

  static async getGradeByTypeOfLesson(
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

  static async getGradeByTypeOfUser(
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
