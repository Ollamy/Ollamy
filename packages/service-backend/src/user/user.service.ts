import * as jwt from 'jsonwebtoken';
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
import { Prisma, User } from '@prisma/client';
import RedisCacheService from 'redis/redis.service';

@Injectable()
export class UserService {
  private createToken(id: string): string {
    const token: string = jwt.sign(
      {
        id,
      },
      SECRET_KEY,
      {
        expiresIn: '2 weeks',
      },
    );

    if (!token) {
      Logger.error('Token not created !');
      throw new ConflictException('Token not created !');
    }

    return token;
  }

  private hashPassword(password: string): string {
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

  private randomIntByString(str: string): number {
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

      return this.createToken(userDb.id);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      }
      throw new ConflictException('User not created !');
    }
  }

  async loginUser(userData: LoginUserModel): Promise<string> {
    await RedisCacheService.run('set', 'test', 'elyes');
    const value = await RedisCacheService.run('get', 'test');
    Logger.warn(value);
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

      return this.createToken(userDb.id);
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
}
