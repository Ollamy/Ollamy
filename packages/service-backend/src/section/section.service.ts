import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateSectionModel,
  IdSectionModel,
  SectionModel,
  UpdateSectionModel,
  SectionIdResponse,
  GetSectionModel,
} from 'section/section.dto';
import { LessonModel } from 'lesson/lesson.dto';
import prisma from 'client';
import {
  Lesson,
  Status,
  Prisma,
  Section,
  UsertoLesson,
  UsertoSection,
} from '@prisma/client';
import { CourseService } from '../course/course.service';

@Injectable()
export class SectionService {
  async postSection(
    sectionData: CreateSectionModel,
  ): Promise<SectionIdResponse> {
    try {
      const sectionDb: Section = await prisma.section.create({
        data: {
          course_id: sectionData.courseId,
          title: sectionData.title,
          description: sectionData.description,
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
      const sectionDb: Section = await prisma.section.findFirst({
        where: {
          id: sectionId,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new ConflictException('Section does not exists !');
      }

      const userToSection = await prisma.usertoSection.findUnique({
        where: {
          section_id_user_id: {
            section_id: sectionId,
            user_id: ctx.__user.id,
          },
        },
        select: {
          status: true,
        },
      });

      return {
        courseId: sectionDb.course_id,
        title: sectionDb.title,
        description: sectionDb.description,
        status:
          ctx.__device.isPhone || ctx.__device.isTablet || ctx.__device.isMobile
            ? userToSection?.status
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
      const sectionLessonsDb: Lesson[] = await prisma.lesson.findMany({
        where: {
          section_id: sectionId,
        },
      });

      if (!sectionLessonsDb) {
        Logger.error('No chapters for this course !');
        throw new NotFoundException('No chapters for this course !');
      }

      const lessonPromises: Promise<LessonModel>[] = sectionLessonsDb.map(
        async (lesson: Lesson) => {
          const userLesson = await prisma.usertoLesson.findUnique({
            where: {
              lesson_id_user_id: {
                user_id: ctx.__user.id,
                lesson_id: lesson.id,
              },
            },
          });

          const questionsCount = await prisma.question.count({
            where: {
              lesson_id: lesson.id,
            },
          });

          const lecturesCount = await prisma.lecture.count({
            where: {
              lesson_id: lesson.id,
            },
          });

          return {
            id: lesson.id,
            description: lesson.description,
            title: lesson.title,
            status: userLesson?.status || Status.NOT_STARTED,
            numberOfQuestions: questionsCount || 0,
            numberOfLectures: lecturesCount || 0,
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
      let userToSection = await prisma.usertoSection.findUnique({
        where: {
          section_id_user_id: {
            user_id: userId,
            section_id: sectionId,
          },
        },
      });

      if (!userToSection) {
        userToSection = await prisma.usertoSection.create({
          data: {
            user_id: userId,
            section_id: sectionId,
            status: Status.IN_PROGRESS,
          },
        });
      }

      if (!userToSection) {
        Logger.error('Failed to create user section !');
        throw new NotFoundException('Failed to create user section !');
      }
      return { id: userToSection.section_id } as SectionIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User Section not created !');
    }
  }

  static async UpdateSectionCompletionFromLesson(
    lessonId: string,
    userId: string,
  ) {
    const sectionId = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        section_id: true,
      },
    });

    const sectionLessonsIds = (
      await prisma.lesson.findMany({
        where: {
          section_id: sectionId.section_id,
        },
        select: { id: true },
      })
    ).map((lesson) => lesson.id);

    const sectionUserToLessonStatuses: Status[] = (
      await prisma.usertoLesson.findMany({
        where: {
          id: { in: sectionLessonsIds },
        },
        select: { status: true },
      })
    ).map((userToLessonObject) => userToLessonObject.status);

    if (
      sectionUserToLessonStatuses.every(
        (status) => status === Status.COMPLETED,
      ) === true
    ) {
      await prisma.usertoSection.update({
        where: {
          section_id_user_id: {
            section_id: sectionId.section_id,
            user_id: userId,
          },
        },
        data: { status: Status.COMPLETED },
      });

      CourseService.UpdateCourseCompletionFromLesson(
        sectionId.section_id,
        userId,
      );
    }
  }
}
