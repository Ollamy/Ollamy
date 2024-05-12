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
} from 'section/section.dto';
import { LessonModel } from 'lesson/lesson.dto';
import prisma from 'client';
import { Lesson, Prisma, Section } from '@prisma/client';

@Injectable()
export class SectionService {
  async postSection(sectionData: CreateSectionModel): Promise<SectionIdResponse> {
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

  async getSection(SectionId: string): Promise<SectionModel> {
    try {
      const sectionDb: Section = await prisma.section.findFirst({
        where: {
          id: SectionId,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new ConflictException('Section does not exists !');
      }

      return {
        courseId: sectionDb.course_id,
        title: sectionDb.title,
        description: sectionDb.description,
      } as SectionModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not found !');
    }
  }

  async updateSection(
    SectionId: string,
    sectionData: UpdateSectionModel,
  ): Promise<SectionIdResponse> {
    try {
      const sectionDb = await prisma.section.update({
        where: {
          id: SectionId,
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

  async getSectionLessons(SectionId: string, ctx: any): Promise<LessonModel[]> {
    try {
      const sectionLessonsDb: Lesson[] = await prisma.lesson.findMany({
        where: {
          section_id: SectionId,
        },
      });

      if (!sectionLessonsDb) {
        Logger.error('No chapters for this course !');
        throw new NotFoundException('No chapters for this course !');
      }

      const lessonPromises: Promise<LessonModel>[] = sectionLessonsDb.map(async (lesson: Lesson) => {
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
          status: userLesson.status,
          numberOfQuestions: questionsCount || 0,
          numberOfLectures: lecturesCount || 0,
        };
      });

      return await Promise.all(lessonPromises);
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }
}
