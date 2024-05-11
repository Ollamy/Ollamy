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
  LessonIdResponse,
} from './lesson.dto';
import { LectureModel, LessonLectureModel, QuestionModel } from 'question/question.dto';
import prisma from 'client';
import {
  Prisma,
  Question,
  Lesson,
  UsertoLesson,
  Lecture,
} from '@prisma/client';
import { error } from 'console';

@Injectable()
export class LessonService {
  async postLesson(
    lessonData: CreateLessonModel,
    ctx: any,
  ): Promise<LessonIdResponse> {
    try {
      const lessonDb: Lesson = await prisma.lesson.create({
        data: {
          section_id: lessonData.sectionId,
          title: lessonData.title,
          description: lessonData.description,
        },
      });

      if (!lessonDb) {
        Logger.error('Failed to create lesson !');
        throw new NotFoundException('Failed to create lesson !');
      }

      await prisma.usertoLesson.create({
        data: {
          user_id: ctx.__user.id,
          lesson_id: lessonDb.id,
        },
      });

      return { id: lessonDb.id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not created !');
    }
  }

  async deleteLesson(lessonData: IdLessonModel): Promise<LessonIdResponse> {
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

      return { id: lessonDb.id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Lesson already removed !');
      }
      throw new ConflictException('Lesson not created !');
    }
  }

  async getLesson(LessonId: string): Promise<CreateLessonModel> {
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
        title: lessonDb.title,
        description: lessonDb.description,
      } as CreateLessonModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not found !');
    }
  }

  async updateLesson(
    LessonId: string,
    lessonData: UpdateLessonModel,
  ): Promise<LessonIdResponse> {
    try {
      const lessonDb = await prisma.lesson.update({
        where: {
          id: LessonId,
        },
        data: {
          section_id: lessonData.sectionId,
          title: lessonData.title,
          description: lessonData.description,
        },
      });

      if (!lessonDb) {
        Logger.error('Lesson does not exists !');
        throw new ConflictException('Lesson does not exists !');
      }

      return { id: lessonDb.id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Lesson not updated !');
    }
  }

  async getLessonQuestions(LessonId: string): Promise<QuestionModel[]> {
    try {
      const lessonQuestionsDb: Question[] = await prisma.question.findMany({
        orderBy: [
          {
            order: 'asc',
          },
        ],
        where: {
          lesson_id: LessonId,
        },
      });

      if (!lessonQuestionsDb) {
        Logger.error('No questions for this course !');
        throw new NotFoundException('No questions for this course !');
      }

      return lessonQuestionsDb.map((question: Question) => {
        delete question.trust_answer_id;
        delete question.lesson_id;
        return question;
      }) as unknown as QuestionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Lessons not found !');
    }
  }

  async getLessonLecture(LessonId: string): Promise<LessonLectureModel[]> {
    try {
      const lessonlectureDb: Lecture[] = await prisma.lecture.findMany({
        where: {
          lesson_id: LessonId,
        },
      });

      if (!lessonlectureDb) {
        Logger.error('No lecture for this course !');
        return [] as LessonLectureModel[];
      }

      return lessonlectureDb.map((lecture: Lecture) => {
        delete lecture.lesson_id;
        return lecture;
      }) as LessonLectureModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException(error);
    }
  }

  async joinLesson(
    lessonId: string,
    userId: string,
  ): Promise<LessonIdResponse> {
    try {
      const usertoLessonDb: UsertoLesson = await prisma.usertoLesson.create({
        data: {
          user_id: userId,
          lesson_id: lessonId,
        },
      });

      if (!usertoLessonDb) {
        Logger.error('Failed to create user lesson !');
        throw new NotFoundException('Failed to create user lesson !');
      }
      return { id: usertoLessonDb.lesson_id } as LessonIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User Lesson not created !');
    }
  }
}
