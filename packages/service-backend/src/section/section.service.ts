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
        status:
          !ctx.__device.isMaker && userToSection
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
      const sectionLessonsDb = await prisma.lesson.findMany({
        where: {
          section_id: sectionId,
        },
        include: {
          UsertoLesson: {
            where: {
              user_id: ctx.__user.id,
            },
          },
        },
      });

      if (!sectionLessonsDb) {
        Logger.error('No lesson for this section !');
        throw new NotFoundException('No lesson for this section !');
      }

      const lessonPromises: Promise<LessonModel>[] = sectionLessonsDb.map(
        async (lesson) => {
          let questionsCount = undefined;
          let lecturesCount = undefined;

          if (!ctx.__device.isMaker) {
            questionsCount = await prisma.question.count({
              where: {
                lesson_id: lesson.id,
              },
            });

            lecturesCount = await prisma.lecture.count({
              where: {
                lesson_id: lesson.id,
              },
            });
          }

          return {
            id: lesson.id,
            description: lesson.description,
            title: lesson.title,
            status: lesson?.UsertoLesson[0]?.status ?? Status.NOT_STARTED,
            numberOfQuestions: questionsCount ?? 0,
            numberOfLectures: lecturesCount ?? 0,
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
    const remainingLessons = await prisma.lesson.count({
      where: {
        OR: [
          {
            id: lessonId,
            UsertoLesson: {
              none: {
                status: {
                  not: 'COMPLETED',
                },
              },
            },
          },
          {
            id: lessonId,
            UsertoLesson: {
              none: {},
            },
          },
        ],
      },
    });

    if (remainingLessons === 0) {
      const sectionId = await prisma.lesson.findUnique({
        where: { id: lessonId },
        select: {
          section_id: true,
        },
      });
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
