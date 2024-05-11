import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import {
  CreateAnswerModel,
  IdAnswerModel,
  AnswerModel,
  UpdateAnswerModel,
  AnswerIdResponse,
  UpdateAnswerOrderModel,
} from './answer.dto';
import prisma from 'client';
import { Prisma, Answer } from '@prisma/client';
import { PictureService } from '../picture/picture.service';
import { generateKeyBetween } from '../order/order.service';

@Injectable()
export class AnswerService {
  async postAnswer(answerData: CreateAnswerModel): Promise<AnswerIdResponse> {
    try {
      const answers = await prisma.answer.findMany({
        where: {
          question_id: answerData.questionId,
        },
        select: {
          order: true,
          id: true,
        },
        orderBy: [
          {
            order: 'asc',
          },
        ],
      });

      const answerDb: Answer = await prisma.answer.create({
        data: {
          question_id: answerData.questionId,
          data: answerData.data,
          picture_id: answerData.picture
            ? await PictureService.postPicture(answerData.picture)
            : undefined,
          order: generateKeyBetween(
            !answers || !answers.length
              ? undefined
              : answers[answers.length - 1].order,
            undefined,
          ),
        },
      });

      if (!answerDb) {
        Logger.error('Failed to create answer !');
        throw new NotFoundException('Failed to create answer !');
      }
      return { id: answerDb.id } as AnswerIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Answer not created !');
    }
  }

  async deleteAnswer(answerId: IdAnswerModel): Promise<AnswerIdResponse> {
    try {
      const answerDb: Answer = await prisma.answer.delete({
        where: {
          ...answerId,
        },
      });

      if (!answerDb) {
        Logger.error('Answer does not exists !');
        throw new NotFoundException('Answer does not exists !');
      }

      return { id: answerDb.id } as AnswerIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Answer already removed !');
      }
      throw new ConflictException('Answer not created !');
    }
  }

  async getAnswer(answerId: IdAnswerModel): Promise<AnswerModel> {
    try {
      const answerDb: Answer = await prisma.answer.findFirst({
        where: {
          id: answerId.id,
        },
      });

      if (!answerDb) {
        Logger.error('Answer does not exists !');
        throw new ConflictException('Answer does not exists !');
      }

      return {
        questionId: answerDb.question_id,
        data: answerDb.data,
        picture: answerDb.picture_id
          ? await PictureService.getPicture(answerDb.picture_id)
          : undefined,
        order: answerDb.order,
      } as unknown as AnswerModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Answer not found !');
    }
  }

  async updateAnswer(
    answerId: IdAnswerModel,
    answerData: UpdateAnswerModel,
  ): Promise<AnswerIdResponse> {
    try {
      const answerDb: Answer = await prisma.answer.update({
        where: {
          id: answerId.id,
        },
        data: {
          question_id: answerData.questionId,
          data: answerData.data,
          picture_id: answerData.picture
            ? await PictureService.postPicture(answerData.picture)
            : undefined,
        },
      });

      if (!answerDb) {
        Logger.error('Answer does not exists !');
        throw new ConflictException('Answer does not exists !');
      }

      return { id: answerDb.id } as AnswerIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Answer not updated !');
    }
  }

  async updateAnswerOrder(answerData: UpdateAnswerOrderModel): Promise<object> {
    let order: string;
    try {
      order = generateKeyBetween(answerData?.after, answerData?.before);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error.message, 409);
    }
    await prisma.answer.update({
      where: {
        id: answerData.origin,
      },
      data: {
        order: order,
      },
    });

    return {
      order: order,
    };
  }
}
