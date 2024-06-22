import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import {
  CreateLessonModel,
  IdLessonModel,
  LessonModel,
  UpdateLessonModel,
  LessonIdResponse,
  UpdateLessonOrderModel,
} from './lesson.dto';
import {
  LectureModel,
  LessonLectureModel,
  QuestionModel,
} from 'question/question.dto';
import prisma from 'client';
import {
  Prisma,
  Question,
  Lesson,
  Lecture,
  UsertoLesson,
  Status,
} from '@prisma/client';
import { generateKeyBetween } from 'order/order.service';

@Injectable()
export class LessonService {
  async postLesson(
    lessonData: CreateLessonModel,
    ctx: any,
  ): Promise<LessonIdResponse> {
    try {
      const sectionLessons = await prisma.lesson.findMany({
        where: {
          section_id: lessonData.sectionId,
        },
        select: {
          order: true,
          id: true,
        },
        orderBy: [
          {
            order: 'asc',
          },
        ],
      });

      const lessonDb: Lesson = await prisma.lesson.create({
        data: {
          section_id: lessonData.sectionId,
          title: lessonData.title,
          description: lessonData.description,
          order: generateKeyBetween(
            !sectionLessons || !sectionLessons.length
              ? undefined
              : sectionLessons[sectionLessons.length - 1].order,
            undefined,
          ),
        },
      });

      if (!lessonDb) {
        Logger.error('Failed to create lesson !');
        throw new NotFoundException('Failed to create lesson !');
      }

      await prisma.usertoLesson.create({
        data: {
          user_id: ctx.__user.id,
          lesson_id: lessonDb.id,
        },
      });

      return { id: lessonDb.id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not created !');
    }
  }

  async deleteLesson(lessonData: IdLessonModel): Promise<LessonIdResponse> {
    try {
      const lessonDb: Lesson = await prisma.lesson.delete({
        where: {
          ...lessonData,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new NotFoundException('Lesson does not exists !');
      }

      return { id: lessonDb.id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Lesson already removed !');
      }
      throw new ConflictException('Lesson not created !');
    }
  }

  async getLesson(lessonId: string, ctx: any): Promise<LessonModel> {
    try {
      const lessonDb = await prisma.lesson.findFirst({
        orderBy: [
          {
            order: 'asc',
          },
        ],
        where: {
          id: lessonId,
        },
        include: {
          UsertoLesson: {
            select: {
              status: true,
            },
            where: {
              user_id: ctx.__user.id,
            },
          },
        },
      });

      if (!lessonDb || lessonDb.UsertoLesson.length === 0) {
        Logger.error('Lesson does not exists !');
        throw new ConflictException('Lesson does not exists !');
      }

      const questionsCount = await prisma.question.count({
        where: {
          lesson_id: lessonId,
        },
      });

      const lecturesCount = await prisma.lecture.count({
        where: {
          lesson_id: lessonId,
        },
      });

      return {
        id: lessonDb.id,
        title: lessonDb.title,
        description: lessonDb.description,
        status: !ctx.__device._isMaker
          ? lessonDb?.UsertoLesson[0]?.status ?? Status.NOT_STARTED
          : undefined,
        numberOfQuestions: questionsCount,
        numberOfLectures: lecturesCount,
        order: lessonDb.order,
      } as LessonModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException(`Lesson not found ! ${error.message}`);
    }
  }

  async updateLesson(
    LessonId: string,
    lessonData: UpdateLessonModel,
  ): Promise<LessonIdResponse> {
    try {
      const lessonDb = await prisma.lesson.update({
        where: {
          id: LessonId,
        },
        data: {
          section_id: lessonData.sectionId,
          title: lessonData.title,
          description: lessonData.description,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new ConflictException('Lesson does not exists !');
      }

      return { id: lessonDb.id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not updated !');
    }
  }

  async getLessonQuestions(LessonId: string): Promise<QuestionModel[]> {
    try {
      const lessonQuestionsDb: Question[] = await prisma.question.findMany({
        orderBy: [
          {
            order: 'asc',
          },
        ],
        where: {
          lesson_id: LessonId,
        },
      });

      if (!lessonQuestionsDb) {
        Logger.error('No questions for this course !');
        throw new NotFoundException('No questions for this course !');
      }

      return lessonQuestionsDb.map((question: Question) => {
        delete question.trust_answer_id;
        delete question.lesson_id;
        return question;
      }) as unknown as QuestionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }

  async getLessonLecture(LessonId: string): Promise<LessonLectureModel[]> {
    try {
      const lessonlectureDb: Lecture[] = await prisma.lecture.findMany({
        where: {
          lesson_id: LessonId,
        },
      });

      if (!lessonlectureDb) {
        Logger.error('No lecture for this course !');
        return [] as LessonLectureModel[];
      }

      return lessonlectureDb.map((lecture: Lecture) => {
        delete lecture.lesson_id;
        return lecture;
      }) as LessonLectureModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException(error);
    }
  }

  async joinLesson(
    lessonId: string,
    userId: string,
  ): Promise<LessonIdResponse> {
    try {
      const userToLesson = await prisma.usertoLesson.create({
        data: {
          user_id: userId,
          lesson_id: lessonId,
          status: Status.IN_PROGRESS,
        },
      });

      return { id: userToLesson.lesson_id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User Lesson not created !');
    }
  }

  async updateLessonOrder(lessonData: UpdateLessonOrderModel): Promise<object> {
    let order: string;
    try {
      order = generateKeyBetween(lessonData?.after, lessonData?.before);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error.message, 409);
    }
    await prisma.lesson.update({
      where: {
        id: lessonData.origin,
      },
      data: {
        order: order,
      },
    });

    return {
      order: order,
    };
  }
}
