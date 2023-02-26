import * as jwt from 'jsonwebtoken';
import {
  Logger,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateUserModel,
  LoginUserModel,
  UpdateUserModel,
  JwtUserModel,
} from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import * as pbkdf2 from 'pbkdf2';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private createToken(userData: JwtUserModel): string {
    const token = jwt.sign(
      {
        id: userData.id,
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

  private validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    if (
      userData.firstname === '' ||
      userData.lastname === '' ||
      !userData.firstname ||
      !userData.lastname
    ) {
      Logger.error('Firstname or lastname not provided !');
      throw new UnprocessableEntityException(
        'Firstname or lastname not provided !',
      );
    }

    if (!this.validateEmail(userData.email)) {
      Logger.error('Email is not valid !');
      throw new UnprocessableEntityException('Email is not valid !');
    }

    userData.password = this.hashPassword(userData.password);

    try {
      const userDb = await prisma.user.create({
        data: {
          password: userData.password,
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          communities_id: [],
        },
      });

      return this.createToken({
        id: userDb.id,
        email: userDb.email,
        firstname: userDb.firstname,
        lastname: userDb.lastname,
        password: userDb.password,
      } as JwtUserModel);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      } else {
        throw new ConflictException('User not created !');
      }
    }
  }

  async loginUser(userData: LoginUserModel): Promise<string> {
    const userDb = await prisma.user.findUnique({
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
    return this.createToken({
      id: userDb.id,
      email: userDb.email,
      firstname: userDb.firstname,
      lastname: userDb.lastname,
      password: userDb.password,
    } as JwtUserModel);
  }

  async updateUser(userData: UpdateUserModel, ctx: any): Promise<string> {
    try {
      userData.password = this.hashPassword(userData.password);
      const userDb = await prisma.user.update({
        where: {
          id: ctx.__user.id,
        },
        data: {
          password: userData.password,
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
        },
      });

      return this.createToken({
        id: userDb.id,
        email: userDb.email,
        firstname: userDb.firstname,
        lastname: userDb.lastname,
        password: userDb.password,
      } as JwtUserModel);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      } else {
        throw new ConflictException('User not created !');
      }
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
      } else {
        throw new ConflictException('User not created !');
      }
    }
  }
}
