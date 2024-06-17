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
} from './course.dto';
import {
  CourseSectionModel,
  GetSectionModel,
  GetSectionsModel,
  SectionModel,
} from 'section/section.dto';
import prisma from 'client';
import {
  Course,
  Prisma,
  Role,
  Section,
  Status,
  UsertoSection,
} from '@prisma/client';
import { PictureService } from '../picture/picture.service';
import { TasksService } from 'cron/cron.service';
import RedisCacheService from '../redis/redis.service';
import { CourseSectionModel } from 'section/section.dto';
import prisma from 'client';
import { Course, Prisma, Role, Section } from '@prisma/client';
import { PictureService } from 'picture/picture.service';
import { TasksService } from 'cron/cron.service';
import RedisCacheService from 'redis/redis.service';
import { SubscriptionPlan } from '@prisma/client';

const CODE_LENGTH: number = 4;

@Injectable()
export class CourseService {
  constructor(private readonly cronService: TasksService) {}

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

      const users = await prisma.usertoCourse.count({
        where: {
          course_id: courseId,
          role_user: {
            equals: Role.MEMBER,
          },
        },
      });

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
        lastLessonId: userToCourse?.last_lesson_id,
        lastSectionId: userToCourse?.last_section_id,
        numberOfUsers: users,
        status:
          ctx.__device.isPhone || ctx.__device.isTablet || ctx.__device.isMobile
            ? userToCourse?.status
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

      const sectionPromises: Promise<GetSectionsModel>[] = courseSectionsDb.map(
        async (section) => {
          return {
            id: section.id,
            description: section.description,
            title: section.title,
            status: !ctx.__device.isMaker
              ? section?.UsertoSection[0]?.status ?? Status.NOT_STARTED
              : undefined,
          };
        },
      );

      return await Promise.all(sectionPromises);
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
          select: { userlist: { where: { role_user: Role.MEMBER } } },
        },
      },
    });

    const subscriptionSlots =
      result.user?.UserSubscription?.[0]?.Subscription?.slots ?? 0;

    return result._count.userlist <= subscriptionSlots;
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

    const userToCourseDb = await prisma.usertoCourse.create({
      data: {
        user_id: userId,
        course_id: joinCourseId,
      },
    });

    if (!userToCourseDb) {
      Logger.error('Failed to add user to course !');
      throw new ConflictException('Failed to add user to course !');
    }

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
    const remainingLessons = await prisma.section.count({
      where: {
        OR: [
          {
            id: sectionId,
            UsertoSection: {
              none: {
                status: {
                  not: 'COMPLETED',
                },
              },
            },
          },
          {
            id: sectionId,
            UsertoSection: {
              none: {},
            },
          },
        ],
      },
    });

    if (remainingLessons === 0) {
      const courseId = await prisma.section.findUnique({
        where: { id: sectionId },
        select: {
          course_id: true,
        },
      });
      await prisma.usertoCourse.update({
        where: {
          course_id_user_id: {
            course_id: courseId.course_id,
            user_id: userId,
          },
        },
        data: { status: Status.COMPLETED },
      });
    }
  }
}
