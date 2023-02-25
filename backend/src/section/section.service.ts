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
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionService {
  async postSection(sectionData: CreateSectionModel): Promise<string> {
    try {
      const sectionDb = await prisma.section.create({
        data: {
          course_id: sectionData.CourseId,
          title: sectionData.Title,
          description: sectionData.Description,
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
      const sectionDb = await prisma.section.delete({
        where: {
          id: sectionData.Id,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new NotFoundException('Section does not exists !');
      }

      return `Section's ${sectionData.Id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Section already removed !');
      } else {
        throw new ConflictException('Section not created !');
      }
    }
  }

  async getSection(SectionId: string): Promise<SectionModel> {
    try {
      const sectionDb = await prisma.section.findFirst({
        where: {
          id: SectionId,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new ConflictException('Section does not exists !');
      }

      return {
        Id: sectionDb.id,
        CourseId: sectionDb.course_id,
        Title: sectionDb.title,
        Description: sectionDb.description,
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
        data: {
          course_id: sectionData.CourseId,
          title: sectionData.Title,
          description: sectionData.Description,
        },
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
      const sectionChaptersDb = await prisma.chapter.findMany({
        where: {
          section_id: SectionId,
        },
      });

      if (!sectionChaptersDb) {
        Logger.error('No chapters for this course !');
        throw new NotFoundException('No chapters for this course !');
      }

      return sectionChaptersDb.map((lesson) => {
        return {
          Id: lesson.id,
          SectionId: lesson.section_id,
          Title: lesson.title,
          Description: lesson.description,
        };
      }) as ChapterModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Chapters not found !');
    }
  }
}
