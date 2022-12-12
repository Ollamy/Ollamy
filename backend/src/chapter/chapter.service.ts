import { Logger, ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ChapterModel } from './chapter.dto';
import prisma from 'client';

@Injectable()
export class ChapterService {

  async postChapter(chapterData: ChapterModel): Promise<string> {
    try {
      const chapterDb = await prisma.chapter.create({
        data: {
            section_id: chapterData.Section_id
        },
      });
      chapterData.Id = chapterDb.id;
      return "Chapter created";
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Chapter not created !');
    }
  }

  async deleteChapter(chapterData: ChapterModel): Promise<string> {
    try {
        const chapterDb = await prisma.chapter.delete({
            where: {
                id: chapterData.Id,
              },
        });
        return "Chapter deleted"
    } catch (error) {
        Logger.error(error);
      throw new ConflictException('Chapter not deleted !');
    }
  }
}
