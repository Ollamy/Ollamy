import { Logger, ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { LessonModel } from './lesson.dto';
import prisma from 'client';

@Injectable()
export class LessonService {

  async postLesson(lessonData: LessonModel): Promise<string> {
    try {
      const lessonDb = await prisma.lesson.create({
        data: {
            chapter_id: lessonData.Chapter_id,
            title: lessonData.Title,
            description: lessonData.Description,
            data: lessonData.Data
        },
      });
      lessonData.Id = lessonDb.id;
      return "Lesson created";
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not created !');
    }
  }

  async deleteLesson(lessonData: LessonModel): Promise<string> {
    try {
        const lessonDb = await prisma.lesson.delete({
            where: {
                id: lessonData.Id,
              },
        });
        return "Lesson deleted"
    } catch (error) {
        Logger.error(error);
      throw new ConflictException('Lesson not deleted !');
    }
  }
}
