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
import { Prisma, Question } from '@prisma/client';

@Injectable()
export class QuestionService {
  async postQuestion(questionData: CreateQuestionModel): Promise<string> {
    try {
      const questionDb: Question = await prisma.question.create({
        data: {
          lesson_id: questionData.lessonId,
          title: questionData.title,
          description: questionData.description,
          type_answer: questionData.typeAnswer,
          type_question: questionData.typeQuestion,
        },
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

  async deleteQuestion(questionId: IdQuestionModel): Promise<string> {
    try {
      const questionDb: Question = await prisma.question.delete({
        where: {
          ...questionId,
        },
      });

      if (!questionDb) {
        Logger.error('Question does not exists !');
        throw new NotFoundException('Question does not exists !');
      }

      return `Question's ${questionId.id} has been deleted.`;
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
      const questionDb: Question = await prisma.question.findFirst({
        where: {
          id: QuestionId,
        },
      });

      if (!questionDb) {
        Logger.error('Question does not exists !');
        throw new ConflictException('Question does not exists !');
      }

      return {
        id: questionDb.id,
        lessonId: questionDb.lesson_id,
        title: questionDb.title,
        description: questionDb.description,
        typeAnswer: questionDb.type_answer,
        typeQuestion: questionDb.type_question,
        trustAnswerId: questionDb.trust_answer_id,
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
      const questionDb: Question = await prisma.question.update({
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
