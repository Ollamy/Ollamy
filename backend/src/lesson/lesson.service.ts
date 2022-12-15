import {
  Logger,
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IdLessonModel, LessonModel, UpdateLessonModel } from './lesson.dto';
import { QuestionModel } from 'question/question.dto';
import prisma from 'client';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonService {
  async postLesson(lessonData: LessonModel, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const lessonDb = await prisma.lesson.create({
        data: {
          chapter_id: lessonData.ChapterId,
          title: lessonData.Title,
          description: lessonData.Description,
        },
      });

      if (!lessonDb) {
        Logger.error('Failed to create lesson !');
        throw new NotFoundException('Failed to create lesson !');
      }
      return `Lesson created with id ${lessonDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not created !');
    }
  }

  async deleteLesson(
    lessonData: IdLessonModel,
    token: string,
  ): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const lessonDb = await prisma.lesson.delete({
        where: {
          id: lessonData.Id,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new NotFoundException('Lesson does not exists !');
      }

      return `Lesson's ${lessonData.Id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Lesson already removed !');
      } else {
        throw new ConflictException('Lesson not created !');
      }
    }
  }

  async getLesson(LessonId: string, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const lessonDb = await prisma.lesson.findFirst({
        where: {
          id: LessonId,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new ConflictException('Lesson does not exists !');
      }

      const lesson: LessonModel = {
        Id: lessonDb.id,
        ChapterId: lessonDb.chapter_id,
        Title: lessonDb.title,
        Description: lessonDb.description,
      };

      return JSON.stringify(lesson);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not found !');
    }
  }

  async updateLesson(
    LessonId: string,
    lessonData: UpdateLessonModel,
  ): Promise<string> {
    try {
      const lessonDb = await prisma.lesson.update({
        where: {
          id: LessonId,
        },
        data: {
          chapter_id: lessonData.ChapterId,
          title: lessonData.Title,
          description: lessonData.Description,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new ConflictException('Lesson does not exists !');
      }

      return `Lesson with id ${LessonId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not updated !');
    }
  }

  async getLessonQuestions(LessonId: string): Promise<string> {
    try {

      const lessonQuestionsDb = await prisma.question.findMany({
        where: {
          lesson_id: LessonId
        },
      });

      if (!lessonQuestionsDb) {
        Logger.error('No questions for this course !');
        throw new NotFoundException('No questions for this course !');
      }

      let questions : QuestionModel[] = Array();

      lessonQuestionsDb.forEach((question) => {
        questions.push({
          Id: question.id,
          LessonId: question.lesson_id,
          Title: question.title,
          Description: question.description,
          Data: question.data
        })
      });

      return JSON.stringify(questions);
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }
}
