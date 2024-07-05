import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
  CourseIdResponse,
  CourseTrueResponse,
  GetCourseRequest,
  UserCourseHp,
  ShareCourseCode,
  ExpirationMap,
  Durationtype,
  EnrollmentResponse,
  EnrollmentTotal,
  EnrollmentResponseTotal,
} from './course.dto';
import { GetSectionsModel } from 'section/section.dto';
import { Course, Prisma, Role, Status } from '@prisma/client';
import prisma from 'client';
import { PictureService } from 'picture/picture.service';
import { TasksService } from 'cron/cron.service';
import RedisCacheService from 'redis/redis.service';

const CODE_LENGTH: number = 4;

@Injectable()
export class CourseService {
  constructor(private readonly cronService: TasksService) { }

  async postCourse(
    courseData: CreateCourseModel,
    ctx: any,
  ): Promise<CourseIdResponse> {
    try {
      const courseDb = await prisma.course.create({
        data: {
          owner_id: ctx.__user.id,
          title: courseData.title,
          description: courseData.description,
          picture_id: courseData?.picture
            ? await PictureService.postPicture(courseData.picture)
            : undefined,
        },
      });

      if (!courseDb) {
        Logger.error('Failed to create course !');
        throw new NotFoundException('Failed to create course !');
      }

      await prisma.usertoCourse.create({
        data: {
          user_id: ctx.__user.id,
          course_id: courseDb.id,
          role_user: 'OWNER',
        },
      });

      return { id: courseDb.id } as CourseIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not created !');
    }
  }

  async deleteCourse(courseId: IdCourseModel): Promise<CourseIdResponse> {
    try {
      const courseDb = await prisma.course.delete({
        where: {
          ...courseId,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new NotFoundException('Course does not exists !');
      }

      return { id: courseDb.id } as CourseIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Course already removed !');
      }
      throw new ConflictException('Course not deleted !');
    }
  }

  async getCourse(courseId: string, ctx: any): Promise<GetCourseRequest> {
    try {
      const courseDb: Course = await prisma.course.findFirst({
        where: {
          id: courseId,
        },
      });

      const userToCourse = await prisma.usertoCourse.findFirst({
        where: {
          user_id: ctx.__user.id,
          course_id: courseId,
        },
      });

      let userCount: number = undefined;

      if (ctx.__device.isMaker) {
        userCount = await prisma.usertoCourse.count({
          where: {
            course_id: courseId,
            role_user: {
              equals: Role.MEMBER,
            },
          },
        });
      }

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      return {
        ownerId: courseDb.owner_id,
        title: courseDb.title,
        description: courseDb.description,
        picture: courseDb.picture_id
          ? await PictureService.getPicture(courseDb.picture_id)
          : undefined,
        numberOfUsers: userCount,
        status: !ctx.__device.isMaker
          ? userToCourse?.status ?? Status.NOT_STARTED
          : undefined,
      } as GetCourseRequest;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course does not exists !');
    }
  }

  async updateCourse(
    CourseId: string,
    courseData: UpdateCourseModel,
  ): Promise<CourseIdResponse> {
    try {
      if (courseData?.picture === null) {
        const pictureId = await prisma.course.findUnique({
          where: {
            id: CourseId,
          },
          select: {
            picture_id: true,
          },
        });

        await PictureService.deletePicture(pictureId.picture_id);
        courseData.picture = undefined;
      }

      const courseDb: Course = await prisma.course.update({
        where: {
          id: CourseId,
        },
        data: {
          owner_id: courseData?.ownerId,
          title: courseData?.title,
          description: courseData?.description,
          picture_id: courseData?.picture
            ? await PictureService.postPicture(courseData.picture)
            : undefined,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      return { id: courseDb.id } as CourseIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not updated !');
    }
  }

  async getCourseSections(
    CourseId: string,
    ctx: any,
  ): Promise<GetSectionsModel[]> {
    try {
      const courseSectionsDb = await prisma.section.findMany({
        orderBy: [
          {
            order: 'asc',
          },
        ],
        where: {
          course_id: CourseId,
        },
        include: {
          UsertoSection: {
            where: {
              user_id: ctx.__user.id,
            },
          },
        },
      });

      if (!courseSectionsDb) {
        Logger.error('No sections for this course !');
        throw new NotFoundException('No sections for this course !');
      }

      const sectionPromises: GetSectionsModel[] = courseSectionsDb.map(
        (section) => {
          return {
            id: section.id,
            description: section.description,
            title: section.title,
            order: section.order,
            status: !ctx.__device.isMaker
              ? section?.UsertoSection[0]?.status ?? Status.NOT_STARTED
              : undefined,
          };
        },
      );

      return sectionPromises;
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Sections not found !');
    }
  }

  async checkCourseSlots(courseId): Promise<boolean> {
    const result = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        user: {
          select: {
            UserSubscription: {
              select: {
                Subscription: {
                  select: { slots: true },
                },
              },
            },
          },
        },
        _count: {
          select: { userToCourse: { where: { role_user: Role.MEMBER } } },
        },
      },
    });

    const subscriptionSlots =
      result.user?.UserSubscription?.[0]?.Subscription?.slots ?? 0;

    return result._count.userToCourse <= subscriptionSlots;
  }

  async addUserToCourse(
    courseId: string,
    code: string,
    userId: string,
  ): Promise<CourseTrueResponse> {
    let joinCourseId: string;

    if (code) {
      joinCourseId = (await RedisCacheService.run(
        'GET',
        `sharecode:${code}`,
      )) as string;
    }

    if (courseId) {
      joinCourseId = courseId;
    }

    if (!(await this.checkCourseSlots(joinCourseId))) {
      Logger.error('Course is full for subscription plan !');
      throw new ConflictException('Course is full for subscription plan !');
    }

    await prisma.$transaction(async (prisma) => {
      const userToCourse = await prisma.usertoCourse.create({
        data: {
          user_id: userId,
          course_id: joinCourseId,
        },
      });

      if (!userToCourse) {
        throw new ConflictException('Failed to add user to course');
      }
  
      const userToSectionDb = await prisma.section.findMany({
        where: {
          course_id: joinCourseId,
        },
      });

      await prisma.usertoSection.createMany({
        data: userToSectionDb.map((section) => {
          return {
            user_id: userId,
            section_id: section.id,
          };
        }),
      });

      const userToLessonDb = await prisma.lesson.findMany({
        where: {
          section: {
            course_id: joinCourseId,
          },
        },
      });

      await prisma.usertoLesson.createMany({
        data: userToLessonDb.map((lesson) => {
          return {
            user_id: userId,
            lesson_id: lesson.id,
          };
        }),
      });
    });

    await RedisCacheService.run('DEL', `sharecode:${code}`);
    return { success: true } as CourseTrueResponse;
  }

  async getUserToCourseHp(
    courseId: string,
    userId: string,
  ): Promise<UserCourseHp> {
    try {
      const data = await prisma.usertoCourse.findFirst({
        where: {
          user_id: userId,
          course_id: courseId,
        },
        select: {
          hp: true,
        },
      });

      if (!data) {
        Logger.error('Cannot find userToCourse');
        throw new NotFoundException('Cannot find userToCourse');
      }

      return {
        hp: data.hp,
        timer: this.cronService.getJobElapsedtime(userId, courseId),
      };
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Error while fecthing hp !');
    }
  }

  async generateCodeforCourse(
    courseId: string,
    duration: Durationtype,
    ctx: any,
  ): Promise<ShareCourseCode> {
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        owner_id: ctx.__user.id,
      },
    });

    if (!course) {
      throw new ConflictException('Permission denied !');
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < CODE_LENGTH; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    await RedisCacheService.run(
      'SET',
      `sharecode:${code}`,
      courseId,
      'EX',
      ExpirationMap[duration ?? Durationtype.FIFTEEN_MINUTES],
    );

    const expirationDate = new Date();
    expirationDate.setSeconds(
      expirationDate.getSeconds() +
      ExpirationMap[duration ?? Durationtype.FIFTEEN_MINUTES],
    );

    return { code, expiresAt: expirationDate };
  }

  static async UpdateCourseCompletionFromLesson(
    sectionId: string,
    userId: string,
  ) {
    const course = await prisma.section.findUnique({
      where: { id: sectionId },
      select: {
        course_id: true,
      },
    });

    const remainingSection = await prisma.$queryRaw`
      select count(*) as nb_left
      from "Section" as s
      where s.course_id = ${course.course_id}::uuid
      and not exists(
          select 1
          from "UsertoSection" uts
          where uts.section_id = s.id
              and uts.status = 'COMPLETED'
              and uts.user_id = ${userId}::uuid
    )`;

    if (remainingSection[0].nb_left === BigInt(0)) {
      const avg_percentage = await prisma.usertoSection.aggregate({
        _avg: {
          score: true,
        },
        where: {
          user_id: userId,
          section_id: sectionId,
        }
      });

      await prisma.usertoCourse.update({
        where: {
          course_id_user_id: {
            course_id: course.course_id,
            user_id: userId,
          },
        },
        data: {
          status: Status.COMPLETED,
          score: avg_percentage._avg.score,
        },
      });
    }
  }

  private calculateCumulativeEnrollments(enrollments: EnrollmentResponse[]): EnrollmentTotal[] {
    let total = 0;

    enrollments.sort((a, b) => a.epoch - b.epoch);

    return enrollments.map(enrollment => (
      {
        epoch: enrollment.epoch,
        total: ++total,
      }
    ));
  }

  async getEnrollmentsForOwnerCourse(ownerId: string, courseId?: string | undefined): Promise<EnrollmentResponseTotal> {
    try {
      const enrollments = await prisma.usertoCourse.findMany({
        where: courseId ? {
          course_id: courseId,
          course: {
            id: courseId,
            owner_id: ownerId
          }
        } : {
          course: {
            owner_id: ownerId
          }
        },
        select: {
          user_id: true,
          created_at: true,
        },
      });

      if (!enrollments.length) {
        throw new NotFoundException(`No enrollments found for course with id: ${courseId}`);
      }

      const response: EnrollmentResponse[] = enrollments.map(enrollment => (
        {
          userId: enrollment.user_id,
          epoch: enrollment.created_at.getTime(),
        }
      ));

      const cumulative = this.calculateCumulativeEnrollments(response);

      return {
        total: response.length,
        enrollments: response,
        cumulative,
      };
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Failed to get enrollments for course.');
    }
  }
}
