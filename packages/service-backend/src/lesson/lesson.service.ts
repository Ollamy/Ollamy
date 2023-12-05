import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateLessonModel,
  IdLessonModel,
  JoinLessonModel,
  LessonModel,
  UpdateLessonModel,
} from './lesson.dto';
import { QuestionModel } from 'question/question.dto';
import prisma from 'client';
import { Prisma, Question, Lesson, UsertoLesson } from '@prisma/client';

@Injectable()
export class LessonService {
  async postLesson(lessonData: CreateLessonModel): Promise<string> {
    try {
      const lessonDb: Lesson = await prisma.lesson.create({
        data: {
          section_id: lessonData.section_id,
          title: lessonData.title,
          description: lessonData.description,
        },
      });

      if (!lessonDb) {
        Logger.error('Failed to create lesson !');
        throw new NotFoundException('Failed to create lesson !');
      }
      return lessonDb.id;
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

      return lessonData.id;
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
        sectionId: lessonDb.section_id,
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

      return LessonId;
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
        };
      }) as QuestionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }

  async joinLesson(
    lessonId: string,
    joinData: JoinLessonModel,
  ): Promise<string> {
    try {
      const usertoLessonDb: UsertoLesson = await prisma.usertoLesson.create({
        data: {
          user_id: joinData.userId,
          lesson_id: lessonId,
        },
      });

      if (!usertoLessonDb) {
        Logger.error('Failed to create user lesson !');
        throw new NotFoundException('Failed to create user lesson !');
      }
      return usertoLessonDb.id;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User Lesson not created !');
    }
  }
}
