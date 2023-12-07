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
  QuestionIdResponse,
} from './question.dto';
import prisma from 'client';
import { Answer, Prisma, Question } from '@prisma/client';
import { PictureService } from '../picture/picture.service';
import { AnswerModel } from '../answer/answer.dto';

@Injectable()
export class QuestionService {
  async postQuestion(questionData: CreateQuestionModel): Promise<QuestionIdResponse> {
    try {
      const questionDb: Question = await prisma.question.create({
        data: {
          lesson_id: questionData.lessonId,
          title: questionData.title,
          description: questionData.description,
          type_answer: questionData.typeAnswer,
          type_question: questionData.typeQuestion,
          difficulty: questionData?.difficulty,
        },
      });

      if (!questionDb) {
        Logger.error('Failed to create question !');
        throw new NotFoundException('Failed to create question !');
      }
      return { id: questionDb.id } as QuestionIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Question not created !');
    }
  }

  async deleteQuestion(questionId: IdQuestionModel): Promise<QuestionIdResponse> {
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

      return { id: questionDb.id } as QuestionIdResponse;
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
        pictureId: await PictureService.getPicture(questionDb.picture_id),
        difficulty: questionDb.difficulty,
      } as QuestionModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Question not found !');
    }
  }

  async updateQuestion(
    QuestionId: string,
    questionData: UpdateQuestionModel,
  ): Promise<QuestionIdResponse> {
    try {
      const questionDb: Question = await prisma.question.update({
        where: {
          id: QuestionId,
        },
        data: {
          title: questionData.title,
          description: questionData.description,
          lesson_id: questionData.lessonId,
          picture_id: await PictureService.postPicture(questionData.picture),
          points: questionData.points,
          difficulty: questionData?.difficulty,
          trust_answer_id: questionData?.trustAnswerId,
        },
      });

      if (!questionDb) {
        Logger.error('Question does not exists !');
        throw new ConflictException('Question does not exists !');
      }

      return { id: questionDb.id } as QuestionIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Question not updated !');
    }
  }

  async getQuestionAnswers(QuestionId: string): Promise<AnswerModel[]> {
    try {
      const answersDb: Answer[] = await prisma.answer.findMany({
        where: {
          question_id: QuestionId,
        },
      });

      if (!answersDb) {
        Logger.error('Answers does not exists !');
        throw new ConflictException('Answers does not exists !');
      }

      const answerPromises = answersDb.map(async (answer) => {
        return {
          id: answer.id,
          questionId: answer.question_id,
          data: answer.data,
          picture: answer.picture_id
            ? await PictureService.getPicture(answer.picture_id)
            : undefined,
        } as AnswerModel;
      });

      return await Promise.all(answerPromises);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Answers not found !');
    }
  }
}
