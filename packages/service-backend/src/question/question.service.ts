import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import {
  CreateQuestionModel,
  IdQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
  QuestionIdResponse,
  UpdateQuestionOrderModel,
  ValidateAnswerModel,
  ValidateAnswerResponse,
} from './question.dto';
import prisma from 'client';
import { Answer, LessonStatus, Prisma, Question } from '@prisma/client';
import { PictureService } from '../picture/picture.service';
import { AnswerModel } from '../answer/answer.dto';
import { generateKeyBetween } from 'order/order.service';

@Injectable()
export class QuestionService {
  async postQuestion(
    questionData: CreateQuestionModel,
  ): Promise<QuestionIdResponse> {
    try {
      let order: string;

      const lessonQuestions = await prisma.question.findMany({
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

      try {
        order = generateKeyBetween(
          lessonQuestions[lessonQuestions.length - 1].order,
          undefined,
        );
      } catch (error) {
        Logger.error(error);
        throw new HttpException(error.message, 409);
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
          picture_id: questionData.pictureId
            ? await PictureService.postPicture(questionData.pictureId)
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
    let order: string;
    try {
      order = generateKeyBetween(questionData?.after, questionData?.before);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error.message, 409);
    }
    await prisma.question.update({
      where: {
        id: questionData.origin,
      },
      data: {
        order: order,
      },
    });

    return {
      order: order,
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

  async getCourseIdFromLesson(lessonId: string): Promise<string> {
    const { section_id } = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        section_id: true,
      },
    });

    const { course_id } = await prisma.section.findUnique({
      where: {
        id: section_id,
      },
      select: {
        course_id: true,
      },
    });

    return course_id;
  }

  async validateAnswer(
    body: ValidateAnswerModel,
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

    const courseId = await this.getCourseIdFromLesson(questionDb.lesson_id);

    const { hp } = await prisma.usertoCourse.findUnique({
      where: {
        course_id_user_id: {
          course_id: courseId,
          user_id: ctx.__user.id,
        },
      },
      select: {
        hp: true,
      },
    });

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
    } else if (isValidated === false && hp > 0) {
      await prisma.usertoCourse.update({
        where: {
          course_id_user_id: {
            course_id: courseId,
            user_id: ctx.__user.id,
          },
        },
        data: {
          hp: {
            decrement: 1,
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
      hp: hp - 1,
    };
  }
}
