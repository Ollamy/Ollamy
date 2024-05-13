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
  GetQuestionModel,
} from './question.dto';
import prisma from 'client';
import { Answer, AnswerType, LessonStatus, Prisma, Question } from '@prisma/client';
import { PictureService } from '../picture/picture.service';
import { AnswerModel, QuestionAnswerModel } from '../answer/answer.dto';
import { generateKeyBetween } from 'order/order.service';

@Injectable()
export class QuestionService {
  async postQuestion(
    questionData: CreateQuestionModel,
  ): Promise<QuestionIdResponse> {
    try {
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

      const questionDb: Question = await prisma.question.create({
        data: {
          lesson_id: questionData.lessonId,
          title: questionData.title,
          description: questionData.description,
          type_answer: questionData.typeAnswer,
          type_question: questionData.typeQuestion,
          difficulty: questionData?.difficulty,
          order: generateKeyBetween(
            !lessonQuestions || !lessonQuestions.length
              ? undefined
              : lessonQuestions[lessonQuestions.length - 1].order,
            undefined,
          ),
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

  async getQuestion(QuestionId: string): Promise<GetQuestionModel> {
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
        lessonId: questionDb.lesson_id,
        title: questionDb.title,
        description: questionDb.description,
        typeAnswer: questionDb.type_answer,
        typeQuestion: questionDb.type_question,
        pictureId: questionDb.picture_id
          ? await PictureService.getPicture(questionDb.picture_id)
          : undefined,
        difficulty: questionDb.difficulty,
        trust_answer_id: questionDb.trust_answer_id,
        order: questionDb.order,
        points: questionDb.points,
      } as GetQuestionModel;
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
      if (questionData?.picture === null) {
        const pictureId = await prisma.question.findUnique({
          where: {
            id: QuestionId,
          },
          select: {
            picture_id: true,
          }
        });

        await PictureService.deletePicture(pictureId.picture_id);
        questionData.picture = undefined;
      }

      const questionDb: Question = await prisma.question.update({
        where: {
          id: QuestionId,
        },
        data: {
          lesson_id: questionData?.lessonId,
          title: questionData?.title,
          description: questionData?.description,
          type_answer: questionData?.typeAnswer,
          type_question: questionData?.typeQuestion,
          trust_answer_id: questionData?.trustAnswerId,
          picture_id: questionData?.picture
            ? await PictureService.postPicture(questionData.picture)
            : undefined,
          difficulty: questionData?.difficulty,
          points: questionData?.points,
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

  async getQuestionAnswers(QuestionId: string): Promise<QuestionAnswerModel[]> {
    try {
      const answersDb: Answer[] = await prisma.answer.findMany({
        where: {
          question_id: QuestionId,
        },
        orderBy: [
          {
            order: 'asc',
          },
        ],
      });

      if (!answersDb) {
        Logger.error('Answers does not exists !');
        throw new ConflictException('Answers does not exists !');
      }

      const answerPromises = answersDb.map(
        async (answer) =>
        ({
          id: answer.id,
          data: answer.data,
          picture: answer.picture_id
            ? await PictureService.getPicture(answer.picture_id)
            : undefined,
          order: answer.order,
        } as unknown as QuestionAnswerModel),
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

    let isValidated = questionDb.trust_answer_id === body?.answerId || false;
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

    if (userLesson.status === LessonStatus.NOT_STARTED) {
      await prisma.usertoLesson.update({
        where: {
          lesson_id_user_id: {
            user_id: userLesson.user_id,
            lesson_id: userLesson.lesson_id,
          },
        },
        data: {
          status: LessonStatus.IN_PROGRESS,
        },
      });
    }

    if (isValidated === true && userLesson.status !== LessonStatus.COMPLETED) {
      await prisma.usertoScore.upsert({
        where: { user_id: ctx.__user.id },
        create: {
          user: {
            connect: {
              id: ctx.__user.id
            }
          },
          score: questionPoints,
        },
        update: {
          score: {
            increment: questionPoints,
          },
        }
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

    if (questionDb.type_answer === AnswerType.FREE_ANSWER) {
      const answerDb = await prisma.answer.findFirst({
        where: {
          id: questionDb.trust_answer_id
        },
      });

      isValidated = body.data === answerDb.data;
    }

    if (!(nextQuestion !== null)) {
      await prisma.usertoLesson.update({
        where: {
          lesson_id_user_id: {
            user_id: userLesson.user_id,
            lesson_id: userLesson.lesson_id,
          },
        },
        data: {
          status: LessonStatus.COMPLETED,
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
