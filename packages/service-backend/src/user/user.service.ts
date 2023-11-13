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
  LoginUserModel,
  UpdateUserModel,
} from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import * as pbkdf2 from 'pbkdf2';
import { Prisma, User, UsertoCourse } from '@prisma/client';
import SessionService from 'redis/session/session.service';
import { LessonModel } from '../lesson/lesson.dto';

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

  async createToken(id: string): Promise<string> {
    const session: string = UserService.generateSessionId();
    const res = await SessionService.set(session, {
      id,
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
    userData.password = this.hashPassword(userData.password);

    try {
      const userDb: User = await prisma.user.create({
        data: {
          ...userData,
          communities_id: [],
        },
      });

      return await this.createToken(userDb.id);
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
    return this.createToken(userDb.id);
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
      userData.password = this.hashPassword(userData.password);
      const userDb: User = await prisma.user.update({
        where: {
          id: ctx.__user.id,
        },
        data: userData,
      });

      return await this.createToken(userDb.id);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async deleteUser(ctx: any): Promise<string> {
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

      return `User's ${ctx.__user.id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('User already removed !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async getLastLesson(ctx: any): Promise<LessonModel> {
    try {
      const lastLesson: UsertoCourse = await prisma.usertoCourse.findFirst({
        where: {
          user_id: ctx.__user.id,
        },
      });

      if (!lastLesson) {
        throw new Error('No completed lessons found for the user.');
      }
      const lesson = lastLesson;

      return {
      } as LessonModel;

    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Could not get last user lesson !');
    }
  }
}
