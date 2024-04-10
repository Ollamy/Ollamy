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
          course_id: sectionData.course_id,
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
        course_id: sectionDb.course_id,
        description: sectionDb.description,
        id: sectionDb.id,
        title: sectionDb.title,
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
          course_id: sectionData.course_id,
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

  async getSectionLessons(SectionId: string): Promise<LessonModel[]> {
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

      return sectionLessonsDb.map((lesson: Lesson) => {
        return {
          section_id: lesson.section_id,
          description: lesson.description,
          id: lesson.id,
          title: lesson.title,
        };
      }) as LessonModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }
}
