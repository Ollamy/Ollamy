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
} from 'section/section.dto';
import { ChapterModel } from 'chapter/chapter.dto';
import prisma from 'client';
import { Chapter, Prisma, Section } from '@prisma/client';

@Injectable()
export class SectionService {
  async postSection(sectionData: CreateSectionModel): Promise<string> {
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
      return `Section created with id ${sectionDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not created !');
    }
  }

  async deleteSection(sectionData: IdSectionModel): Promise<string> {
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

      return `Section's ${sectionData.id} has been deleted.`;
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
  ): Promise<string> {
    try {
      const sectionDb = await prisma.section.update({
        where: {
          id: SectionId,
        },
        data: sectionData,
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new ConflictException('Section does not exists !');
      }

      return `Section with id ${SectionId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not updated !');
    }
  }

  async getSectionChapters(SectionId: string): Promise<ChapterModel[]> {
    try {
      const sectionChaptersDb: Chapter[] = await prisma.chapter.findMany({
        where: {
          section_id: SectionId,
        },
      });

      if (!sectionChaptersDb) {
        Logger.error('No chapters for this course !');
        throw new NotFoundException('No chapters for this course !');
      }

      return sectionChaptersDb.map((lesson: Chapter) => {
        return {
          sectionId: lesson.section_id,
          description: lesson.description,
          id: lesson.id,
          title: lesson.title,
        };
      }) as ChapterModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Chapters not found !');
    }
  }
}
