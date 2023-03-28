import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateQuestionModel,
  IdQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from './question.dto';
import prisma from 'client';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  async postQuestion(questionData: CreateQuestionModel): Promise<string> {
    try {
      const questionDb = await prisma.question.create({
        data: questionData,
      });

      if (!questionDb) {
        Logger.error('Failed to create question !');
        throw new NotFoundException('Failed to create question !');
      }
      return `Question created with id ${questionDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Question not created !');
    }
  }

  async deleteQuestion(questionData: IdQuestionModel): Promise<string> {
    try {
      const questionDb = await prisma.question.delete({
        where: {
          ...questionData,
        },
      });

      if (!questionDb) {
        Logger.error('Question does not exists !');
        throw new NotFoundException('Question does not exists !');
      }

      return `Question's ${questionData.id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Question already removed !');
      }
      throw new ConflictException('Question not created !');
    }
  }

  async getQuestion(QuestionId: string): Promise<QuestionModel> {
    try {
      const questionDb = await prisma.question.findFirst({
        where: {
          id: QuestionId,
        },
      });

      if (!questionDb) {
        Logger.error('Question does not exists !');
        throw new ConflictException('Question does not exists !');
      }

      return {
        ...questionDb,
      } as QuestionModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Question not found !');
    }
  }

  async updateQuestion(
    QuestionId: string,
    questionData: UpdateQuestionModel,
  ): Promise<string> {
    try {
      const questionDb = await prisma.question.update({
        where: {
          id: QuestionId,
        },
        data: questionData,
      });

      if (!questionDb) {
        Logger.error('Question does not exists !');
        throw new ConflictException('Question does not exists !');
      }

      return `Question with id ${QuestionId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Question not updated !');
    }
  }
}
