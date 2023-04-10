import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateLessonModel,
  IdLessonModel,
  LessonModel,
  UpdateLessonModel,
} from './lesson.dto';
import { QuestionModel } from 'question/question.dto';
import prisma from 'client';
import { Prisma, Question, Lesson } from '@prisma/client';

@Injectable()
export class LessonService {
  async postLesson(lessonData: CreateLessonModel): Promise<string> {
    try {
      const lessonDb: Lesson = await prisma.lesson.create({
        data:{
          chapter_id: lessonData.chapterId,
          title: lessonData.title,
          description: lessonData.description,
        }
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

  async deleteLesson(lessonData: IdLessonModel): Promise<string> {
    try {
      const lessonDb: Lesson = await prisma.lesson.delete({
        where: {
          ...lessonData,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new NotFoundException('Lesson does not exists !');
      }

      return `Lesson's ${lessonData.id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Lesson already removed !');
      }
      throw new ConflictException('Lesson not created !');
    }
  }

  async getLesson(LessonId: string): Promise<LessonModel> {
    try {
      const lessonDb: Lesson = await prisma.lesson.findFirst({
        where: {
          id: LessonId,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new ConflictException('Lesson does not exists !');
      }

      return {
        chapterId: lessonDb.chapter_id,
        ...lessonDb,
      } as LessonModel;
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
        data: lessonData,
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

  async getLessonQuestions(LessonId: string): Promise<QuestionModel[]> {
    try {
      const lessonQuestionsDb: Question[] = await prisma.question.findMany({
        where: {
          lesson_id: LessonId,
        },
      });

      if (!lessonQuestionsDb) {
        Logger.error('No questions for this course !');
        throw new NotFoundException('No questions for this course !');
      }

      return lessonQuestionsDb.map((question: Question) => {
        return {
          id: question.id,
          lessonId: question.lesson_id,
          title: question.title,
          description: question.description,
          typeAnswer: question.type_answer,
          typeQuestion: question.type_question,
          data: question.data,
        };
      }) as QuestionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }
}
