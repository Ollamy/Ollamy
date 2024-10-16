import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import {
  CreateSectionModel,
  IdSectionModel,
  UpdateSectionModel,
  SectionIdResponse,
  GetSectionModel,
} from 'section/section.dto';
import { LessonModel } from 'lesson/lesson.dto';
import prisma from 'client';
import { Status, Prisma, Section } from '@prisma/client';
import { CourseService } from '../course/course.service';
import { generateKeyBetween } from 'order/order.service';
import { UpdateQuestionOrderModel } from '../question/question.dto';

@Injectable()
export class SectionService {
  async postSection(
    sectionData: CreateSectionModel,
  ): Promise<SectionIdResponse> {
    try {
      const courseSections = await prisma.section.findMany({
        where: {
          course_id: sectionData.courseId,
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

      const sectionDb: Section = await prisma.section.create({
        data: {
          course_id: sectionData.courseId,
          title: sectionData.title,
          description: sectionData.description,
          order: generateKeyBetween(
            !courseSections || !courseSections.length
              ? undefined
              : courseSections[courseSections.length - 1].order,
            undefined,
          ),
        },
      });

      if (!sectionDb) {
        Logger.error('Failed to create section !');
        throw new NotFoundException('Failed to create section !');
      }
      return { id: sectionDb.id } as SectionIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not created !');
    }
  }

  async deleteSection(sectionData: IdSectionModel): Promise<SectionIdResponse> {
    try {
      const sectionDb: Section = await prisma.section.delete({
        where: {
          ...sectionData,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new NotFoundException('Section does not exists !');
      }

      return { id: sectionData.id } as SectionIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Section already removed !');
      }
      throw new ConflictException('Section not created !');
    }
  }

  async getSection(sectionId: string, ctx: any): Promise<GetSectionModel> {
    try {
      const sectionDb: Section = await prisma.section.findUnique({
        where: {
          id: sectionId,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new ConflictException('Section does not exists !');
      }

      const userToSection = !ctx.__device.isMaker
        ? await prisma.usertoSection.findUnique({
            where: {
              section_id_user_id: {
                section_id: sectionId,
                user_id: ctx.__user.id,
              },
            },
            select: {
              status: true,
            },
          })
        : undefined;

      return {
        courseId: sectionDb.course_id,
        title: sectionDb.title,
        description: sectionDb.description,
        order: sectionDb.order,
        status: !ctx.__device.isMaker
          ? userToSection?.status ?? Status.NOT_STARTED
          : undefined,
      } as GetSectionModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not found !');
    }
  }

  async updateSection(
    sectionId: string,
    sectionData: UpdateSectionModel,
  ): Promise<SectionIdResponse> {
    try {
      const sectionDb = await prisma.section.update({
        where: {
          id: sectionId,
        },
        data: {
          course_id: sectionData.courseId,
          title: sectionData.title,
          description: sectionData.description,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new ConflictException('Section does not exists !');
      }

      return { id: sectionDb.id } as SectionIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not updated !');
    }
  }

  async getSectionLessons(sectionId: string, ctx: any): Promise<LessonModel[]> {
    try {
      const sectionLessonsDb = await prisma.lesson.findMany({
        orderBy: [
          {
            order: 'asc',
          },
        ],
        where: {
          section_id: sectionId,
        },
        include: {
          _count: {
            select: {
              Questions: true,
              Lecture: true,
            },
          },
          UsertoLesson: !ctx.__device.isMaker
            ? {
                where: {
                  user_id: ctx.__user.id,
                },
              }
            : undefined,
        },
      });

      if (!sectionLessonsDb) {
        Logger.error('No lesson for this section !');
        throw new NotFoundException('No lesson for this section !');
      }

      const lessonPromises: Promise<LessonModel>[] = sectionLessonsDb.map(
        async (lesson) => {
          return {
            id: lesson.id,
            description: lesson.description,
            title: lesson.title,
            status: !ctx.__device.isMaker
              ? lesson?.UsertoLesson[0]?.status ?? Status.NOT_STARTED
              : undefined,
            numberOfQuestions: lesson._count?.Questions ?? 0,
            numberOfLectures: lesson._count?.Lecture ?? 0,
            order: lesson.order,
          };
        },
      );

      return await Promise.all(lessonPromises);
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }

  async joinSection(
    sectionId: string,
    userId: string,
  ): Promise<SectionIdResponse> {
    try {
      const userToSection = await prisma.usertoSection.create({
        data: {
          user_id: userId,
          section_id: sectionId,
          status: Status.IN_PROGRESS,
        },
      });
      return { id: userToSection.section_id } as SectionIdResponse;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2022: Unique constraint failed
        if (error.code === 'P2002') {
          return { id: sectionId };
        }
      }
      Logger.error('Failed to create user section !', error);
      throw new NotFoundException('Failed to create user section !');
    }
  }

  static async UpdateSectionCompletionFromLesson(
    lessonId: string,
    userId: string,
  ) {
    const section = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        section_id: true,
      },
    });

    const remainingLessons = await prisma.$queryRaw`
      select count(*) as nb_left
      from "Lesson" as L
      where section_id = ${section.section_id}::uuid
      and not exists(
          select 1
          from  "UsertoLesson" utl
          where utl.lesson_id = L.id
              and utl.status = 'COMPLETED'
              and utl.user_id = ${userId}::uuid
      )`;

    if (remainingLessons[0].nb_left === BigInt(0)) {
      const avg_percentage = await prisma.usertoLesson.aggregate({
        _avg: {
          score: true,
        },
        where: {
          user_id: userId,
          lesson_id: lessonId,
        },
      });

      await prisma.usertoSection.update({
        where: {
          section_id_user_id: {
            section_id: section.section_id,
            user_id: userId,
          },
        },
        data: {
          status: Status.COMPLETED,
          score: avg_percentage._avg.score,
        },
      });

      CourseService.UpdateCourseCompletionFromLesson(
        section.section_id,
        userId,
      );
    }
  }

  async updateSectionOrder(
    sectionData: UpdateQuestionOrderModel,
  ): Promise<object> {
    let order: string;
    try {
      order = generateKeyBetween(sectionData?.after, sectionData?.before);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error.message, 409);
    }
    await prisma.section.update({
      where: {
        id: sectionData.origin,
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
