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
  UpdateQuestionOrderModel,
  validateAnswerModel,
  ValidateAnswerResponse,
} from './question.dto';
import prisma from 'client';
import { Answer, LessonStatus, Prisma, Question } from '@prisma/client';
import { PictureService } from '../picture/picture.service';
import { AnswerModel } from '../answer/answer.dto';
import { generateKeyBetween } from 'order/order.service';

@Injectable()
export class QuestionService {
  async postQuestion(questionData: CreateQuestionModel): Promise<QuestionIdResponse> {
    try {
      const questionOrders: { order: string; id: string }[] =
        await prisma.question.findMany({
          where: {
            lesson_id: questionData.lessonId,
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

      let order = null;
      let lastkey = questionOrders[questionOrders.length - 1]?.order ?? null;

      if (questionData.between === undefined) {
        order = generateKeyBetween(lastkey, null);
      } else {
        const beforeOrder = questionOrders.find(
          (a) => a.id === questionData.between.before,
        )?.order;
        const afterOrder = questionOrders.find(
          (a) => a.id === questionData.between.after,
        )?.order;

        order = generateKeyBetween(beforeOrder, afterOrder);
      }

      const questionDb: Question = await prisma.question.create({
        data: {
          lesson_id: questionData.lessonId,
          title: questionData.title,
          description: questionData.description,
          type_answer: questionData.typeAnswer,
          type_question: questionData.typeQuestion,
          difficulty: questionData?.difficulty,
          order: order,
          points: questionData?.points,
        },
      });

      if (!questionDb) {
        Logger.error('Failed to create question !');
        throw new NotFoundException('Failed to create question !');
      }
      return { id: questionDb.id } as QuestionIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException(`Cant create Question : ${error.stack}!`);
    }
  }

  async deleteQuestion(
    questionId: IdQuestionModel,
  ): Promise<QuestionIdResponse> {
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
        orderBy: [
          {
            order: 'asc',
          },
        ],
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
        pictureId: questionDb.picture_id
          ? await PictureService.getPicture(questionDb.picture_id)
          : undefined,
        difficulty: questionDb.difficulty,
        order: questionDb.order,
        points: questionDb.points,
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
          title: questionData?.title,
          description: questionData?.description,
          lesson_id: questionData?.lessonId,
          picture_id: questionData.picture
            ? await PictureService.postPicture(questionData.picture)
            : undefined,
          points: questionData?.points,
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

  async updateQuestionOrder(
    questionData: UpdateQuestionOrderModel,
  ): Promise<object> {
    const questions: Question[] = await prisma.question.findMany({
      where: {
        id: { in: [questionData.origin, questionData.dest] },
      },
    });

    if (!questions || questions.length !== 2) {
      Logger.error('Questions does not exists !');
      throw new ConflictException('Questions does not exists !');
    }

    const updatedOrigin = await prisma.question.update({
      where: {
        id: questions[0].id,
      },
      data: {
        order: questions[1].order,
      },
    });

    const updatedDest = await prisma.question.update({
      where: {
        id: questions[1].id,
      },
      data: {
        order: questions[0].order,
      },
    });

    return {
      origin: {
        id: updatedOrigin.id,
        order: updatedOrigin.order,
      },
      dest: {
        id: updatedDest.id,
        order: updatedDest.order,
      },
    };
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

      const answerPromises = answersDb.map(
        async (answer) =>
        ({
          id: answer.id,
          questionId: answer.question_id,
          data: answer.data,
          picture: answer.picture_id
            ? await PictureService.getPicture(answer.picture_id)
            : undefined,
        } as AnswerModel),
      );
      return await Promise.all(answerPromises);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Answers not found !');
    }
  }

  async validateAnswer(
    body: validateAnswerModel,
    ctx: any,
  ): Promise<ValidateAnswerResponse> {
    const questionDb: Question = await prisma.question.findUnique({
      where: {
        id: body.questionId,
      },
    });

    const userLesson = await prisma.usertoLesson.findUnique({
      where: {
        lesson_id_user_id: {
          user_id: ctx.__user.id,
          lesson_id: questionDb.lesson_id,
        },
      },
    });

    const lessonQuestions = await prisma.question.findMany({
      where: {
        lesson_id: questionDb.lesson_id,
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

    const nextQuestion =
      lessonQuestions[
      lessonQuestions.findIndex(
        (question) => question.id === body.questionId,
      ) + 1
      ] ?? null;

    const isValidated = questionDb.trust_answer_id === body.answerId;
    const questionPoints =
      questionDb.points === undefined ? 0 : questionDb.points;

    if (isValidated === true && userLesson.status !== LessonStatus.COMPLETED) {
      await prisma.usertoScore.update({
        where: { user_id: ctx.__user.id },
        data: {
          score: {
            increment: questionPoints,
          },
        },
      });

      await prisma.usertoLesson.update({
        where: {
          lesson_id_user_id: {
            user_id: userLesson.user_id,
            lesson_id: userLesson.lesson_id,
          },
        },
        data: {
          score: {
            increment: questionPoints,
          },
        },
      });
    }

    return {
      success: isValidated,
      answer: questionDb.trust_answer_id,
      end: !(nextQuestion !== null),
      nextQuestionId: nextQuestion !== null ? nextQuestion.id : undefined,
      points:
        isValidated && userLesson.status !== LessonStatus.COMPLETED
          ? questionPoints
          : 0,
    };
  }
}
