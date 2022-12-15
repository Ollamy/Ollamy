import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ChapterModel,
  IdChapterModel,
  UpdateChapterModel,
} from './chapter.dto';
import { LessonModel } from 'lesson/lesson.dto';
import prisma from 'client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChapterService {
  async postChapter(chapterData: ChapterModel): Promise<string> {
    try {
      const chapterDb = await prisma.chapter.create({
        data: {
          section_id: chapterData.SectionId,
          title: chapterData.Title,
          description: chapterData.Description,
        },
      });

      if (!chapterDb) {
        Logger.error('Failed to create chapter !');
        throw new NotFoundException('Failed to create chapter !');
      }
      return `Chapter created with id ${chapterDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Chapter not created !');
    }
  }

  async deleteChapter(chapterData: IdChapterModel): Promise<string> {
    try {
      const chapterDb = await prisma.chapter.delete({
        where: {
          id: chapterData.Id,
        },
      });

      if (!chapterDb) {
        Logger.error('Chapter does not exists !');
        throw new NotFoundException('Chapter does not exists !');
      }

      return `Chapter's ${chapterData.Id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Chapter already removed !');
      } else {
        throw new ConflictException('Chapter not created !');
      }
    }
  }

  async getChapter(ChapterId: string): Promise<ChapterModel> {
    try {
      const chapterDb = await prisma.chapter.findFirst({
        where: {
          id: ChapterId,
        },
      });

      if (!chapterDb) {
        Logger.error('Chapter does not exists !');
        throw new ConflictException('Chapter does not exists !');
      }

      const chapter: ChapterModel = {
        Id: chapterDb.id,
        SectionId: chapterDb.section_id,
        Title: chapterDb.title,
        Description: chapterDb.description,
      };

      return chapter;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Chapter not found !');
    }
  }

  async updateChapter(
    ChapterId: string,
    chapterData: UpdateChapterModel,
  ): Promise<string> {
    try {
      const chapterDb = await prisma.chapter.update({
        where: {
          id: ChapterId,
        },
        data: {
          section_id: chapterData.SectionId,
          title: chapterData.Title,
          description: chapterData.Description,
        },
      });

      if (!chapterDb) {
        Logger.error('Chapter does not exists !');
        throw new ConflictException('Chapter does not exists !');
      }

      return `Chapter with id ${ChapterId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Chapter not updated !');
    }
  }

  async getChapterLessons(ChapterId: string): Promise<LessonModel[]> {
    try {
      const courseLessonsDb = await prisma.lesson.findMany({
        where: {
          chapter_id: ChapterId,
        },
      });

      if (!courseLessonsDb) {
        Logger.error('No lessons for this course !');
        throw new NotFoundException('No lessons for this course !');
      }

      return courseLessonsDb.map((lesson) => {
        return {
          Id: lesson.id,
          ChapterId: lesson.chapter_id,
          Title: lesson.title,
          Description: lesson.description,
        };
      }) as LessonModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }
}
