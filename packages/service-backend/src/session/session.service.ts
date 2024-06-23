import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Status } from '@prisma/client';
import prisma from 'client';
import { TasksService } from '../cron/cron.service';
import { SectionService } from '../section/section.service';
import { validateQuestionSessionModel } from './session.dto';

@Injectable()
export class SessionService {
  constructor(private readonly cronService: TasksService) { }

  async createSession(lessonId: string, ctx: any) {
    const data = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        id: true,
        section: {
          select: {
            id: true,
            course_id: true,
          },
        },
        Questions: {
          select: {
            id: true,
            type_question: true,
            trust_answer_id: true,
            Answer: {
              select: {
                id: true,
                data: true,
              },
            },
          },
          orderBy: [
            {
              order: 'asc',
            },
          ],
        },
      },
    })

    await prisma.usertoLesson.update({
      where: {
        lesson_id_user_id: {
          user_id: ctx.__user.id,
          lesson_id: lessonId,
        }
      },
      data: {
        status: Status.IN_PROGRESS,
        score: 0,
      }
    })

    if (!data) {
      throw new NotFoundException('Lesson not found');
    }

    data.Questions.forEach((question) => {
      question.Answer = question.Answer.filter((answer) => answer.id === question.trust_answer_id);
    });

    const session = await prisma.userSession.create({
      data: {
        course_id: data.section.course_id,
        section_id: data.section.id,
        lesson_id: data.id,
        user_id: ctx.__user.id,
        current_question_id: data.Questions[0].id,
        total_questions: data.Questions.length,
        preloaded_data: data.Questions,
      },
    });

    if (!session) {
      throw new BadRequestException('Failed to create session');
    }

    return { session_id: session.id, current_question_id: data.Questions[0].id };
  }

  async getSession(sessionId: string) {
    const session = await prisma.userSession.findUnique({
      where: { id: sessionId },
      select: {
        current_question_id: true,
        correct_answers: true,
        total_questions: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }


  private async processQuestionResult(sessionId: string, isCorrect: boolean, nextQuestion, session, percentage: number) {
    let hp: number;

    if (isCorrect) {
      await prisma.userSession.update({
        where: { id: sessionId },
        data: {
          correct_answers: {
            increment: 1,
          },
          current_question_id: nextQuestion?.id,
          status: nextQuestion ? Status.IN_PROGRESS : Status.COMPLETED,
          end_date: nextQuestion ? null : new Date(),
          user: {
            update: {
              UsertoLesson: {
                update: [
                  {
                    where: {
                      lesson_id_user_id: {
                        user_id: session.user_id,
                        lesson_id: session.lesson_id,
                      }
                    },
                    data: {
                      status: nextQuestion ? Status.IN_PROGRESS : Status.COMPLETED,
                      score: percentage > 100 ? 100 : percentage,
                    }
                  }
                ]
              },
            },
          },
        }
      });

      await SectionService.UpdateSectionCompletionFromLesson(session.lesson_id, session.user_id);
    } else {
      hp = (await prisma.usertoCourse.update({
        where: {
          course_id_user_id: {
            user_id: session.user_id,
            course_id: session.course_id,
          },
        },
        data: {
          hp: {
            decrement: 1,
          }
        },
        select: {
          hp: true,
        }
      })).hp

      this.cronService.createHpCron(session.user_id, session.course_id);
    }
    return hp;
  }

  async validateQuestion(sessionId: string, body: validateQuestionSessionModel) {
    const session = await prisma.userSession.findUnique({
      where: { id: sessionId },
      select: {
        user_id: true,
        course_id: true,
        lesson_id: true,
        status: true,
        correct_answers: true,
        total_questions: true,
        preloaded_data: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status === Status.COMPLETED) {
      throw new BadRequestException('Session already completed');
    }

    const preloaded_data = JSON.parse(JSON.stringify(session.preloaded_data));
    const indexOfCurrentQuestion = preloaded_data.findIndex((question) => question.id === body.questionId);
    const nextQuestion = preloaded_data[indexOfCurrentQuestion + 1] ?? null;
    const isCorrect = preloaded_data[indexOfCurrentQuestion].Answer[0].id === body.answer.id || preloaded_data[indexOfCurrentQuestion].Answer[0].data === body.answer.data;
    const percentage = (((isCorrect) ? session.correct_answers + 1 : session.correct_answers) / session.total_questions) * 100;
    const hp = await this.processQuestionResult(sessionId, isCorrect, nextQuestion, session, percentage);

    return {
      success: isCorrect,
      answer: preloaded_data[indexOfCurrentQuestion].Answer[0].id,
      nextQuestion: nextQuestion?.id ?? null,
      hp,
    };
  }
}
