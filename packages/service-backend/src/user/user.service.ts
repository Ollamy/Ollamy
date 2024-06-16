import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateUserModel,
  GetUserModel,
  GetUserScoreModel,
  LoginUserModel,
  UpdateUserModel,
  UserCoursesResponse,
  UserIdResponse,
  PlatformEnum,
} from './user.dto';
import { PictureService } from 'picture/picture.service';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import * as pbkdf2 from 'pbkdf2';
import { Prisma, Role, Status, User, UsertoScore } from '@prisma/client';
import SessionService from 'redis/session/session.service';

@Injectable()
export class UserService {
  static generateSessionId(): string {
    return pbkdf2
      .pbkdf2Sync(
        Math.random().toString(36).substring(2),
        Math.random().toString(36).substring(2),
        1000,
        64,
        'sha512',
      )
      .toString('hex');
  }

  async createToken(id: string, platform: PlatformEnum): Promise<string> {
    const session: string = UserService.generateSessionId();
    const res = await SessionService.set(session, {
      id,
      platform,
    });

    if (res !== 'OK') {
      Logger.error('Token not created !');
      throw new ConflictException('Token not created !');
    }

    return session;
  }

  hashPassword(password: string): string {
    const hash = pbkdf2
      .pbkdf2Sync(
        password,
        SECRET_KEY,
        this.randomIntByString(SECRET_KEY),
        64,
        'sha512',
      )
      .toString('base64');
    return hash;
  }

  randomIntByString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = (hash % 900000) + 100000;
    return Math.abs(hash);
  }

  async registerUser(userData: CreateUserModel): Promise<string> {
    const platform = userData.platform;
    userData.password = this.hashPassword(userData.password);

    delete userData.platform;
    try {
      const userDb: User = await prisma.user.create({
        data: {
          ...userData,
          communities_id: [],
        },
      });

      return await this.createToken(userDb.id, platform);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async loginUser(userData: LoginUserModel): Promise<string> {
    const userDb: User = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!userDb) {
      Logger.error('User does not exists !');
      throw new NotFoundException('User does not exists !');
    }

    userData.password = this.hashPassword(userData.password);

    if (userData.password !== userDb.password) {
      Logger.error('Wrong password !');
      throw new BadRequestException('Wrong password !');
    }
    return this.createToken(userDb.id, userData.platform);
  }

  async getUser(ctx: any): Promise<GetUserModel> {
    try {
      const userDb: User = await prisma.user.findUnique({
        where: {
          id: ctx.__user.id,
        },
      });

      if (!userDb) {
        Logger.error('User does not exists !');
        throw new NotFoundException('User does not exists !');
      }
      return {
        firstname: userDb.firstname,
        lastname: userDb.lastname,
        email: userDb.email,
      } as GetUserModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User not found !');
    }
  }

  async updateUser(userData: UpdateUserModel, ctx: any): Promise<string> {
    try {
      if (userData.password) {
        userData.password = this.hashPassword(userData.password);
      }
      const userDb: User = await prisma.user.update({
        where: {
          id: ctx.__user.id,
        },
        data: userData,
      });

      return await this.createToken(userDb.id, ctx.__device.platform);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async deleteUser(ctx: any): Promise<UserIdResponse> {
    try {
      const userDb = await prisma.user.delete({
        where: {
          id: ctx.__user.id,
        },
      });

      if (!userDb) {
        Logger.error('User does not exists !');
        throw new NotFoundException('User does not exists !');
      }

      return { id: ctx.__user.id } as UserIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('User already removed !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async getUserCourses(ctx: any): Promise<UserCoursesResponse> {
    try {
      const userDb = await prisma.user.findUnique({
        where: {
          id: ctx.__user.id,
        },
        include: {
          UsertoCourse: true,
        },
      });

      if (!userDb) {
        Logger.error('User does not exists !');
        throw new NotFoundException('User does not exists !');
      }

      const courses_id = userDb.UsertoCourse.map((course) => course.course_id);

      if (courses_id.length === 0) {
        return { courses: [] };
      }

      const courses = await prisma.course.findMany({
        where: {
          id: {
            in: courses_id,
          },
        },
      });

      return {
        courses: await Promise.all(
          courses.map(async (course) => {
            const isOwner = course.owner_id === ctx.__user.id;

            delete course.owner_id;

            let pictureId: string = undefined;
            let users: number = undefined;

            if (!ctx.__device.isMaker) {
              pictureId = await PictureService.getPicture(course.picture_id);
              users = await prisma.usertoCourse.count({
                where: {
                  course_id: course.id,
                  role_user: {
                    equals: Role.MEMBER,
                  },
                },
              });
            }

            delete course.picture_id;

            const {
              last_lesson_id: lastLessonId,
              last_section_id: lastSectionId,
              status: status,
            } = !ctx.__device.isMaker
              ? userDb.UsertoCourse.find((c) => c.course_id === course.id)
              : {
                  last_lesson_id: undefined,
                  last_section_id: undefined,
                  status: undefined,
                };

            return {
              ...course,
              pictureId,
              lastLessonId,
              lastSectionId,
              owner: isOwner,
              numberOfUsers: users,
              status: !ctx.__device.isMaker
                ? status ?? Status.NOT_STARTED
                : undefined,
            };
          }),
        ),
      };
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('User already removed !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async getUserScore(ctx: any): Promise<GetUserScoreModel> {
    try {
      let usertoScoreDb: UsertoScore = await prisma.usertoScore.findUnique({
        where: {
          user_id: ctx.__user.id,
        },
      });

      if (!usertoScoreDb) {
        usertoScoreDb = await prisma.usertoScore.create({
          data: {
            user_id: ctx.__user.id,
          },
        });
      }
      return {
        userId: usertoScoreDb.user_id,
        score: usertoScoreDb.score,
      } as GetUserScoreModel;
    } catch (error) {
      Logger.error(error);
    }
  }
}
