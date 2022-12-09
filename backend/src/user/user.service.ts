import * as jwt from 'jsonwebtoken';
import {
  Logger,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserModel, RegisterUserModel } from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import { createHmac } from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private createToken(userData: UserModel): string {
    const token = jwt.sign(
      {
        _id: userData.Id,
        firstname: userData.Firstname,
        lastname: userData.Lastname,
        email: userData.Email,
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
    const hash = createHmac('sha512', Buffer.from(SECRET_KEY))
      .update(password)
      .digest('hex');
    return hash;
  }

  async registerUser(userData: RegisterUserModel): Promise<string> {
    if (!this.validateEmail(userData.Email)) {
      Logger.error('Email is not valid !');
      throw new UnprocessableEntityException('Email is not valid !');
    }

    userData.Password = this.hashPassword(userData.Password);

    try {
      const userDb = await prisma.user.create({
        data: {
          password: userData.Password,
          email: userData.Email,
          firstname: userData.Firstname,
          lastname: userData.Lastname,
          communities_id: [],
        },
      });

      const user: UserModel = {
        Id: userDb.id,
        Email: userDb.email,
        Firstname: userDb.firstname,
        Lastname: userDb.lastname,
        Password: userDb.password,
        Communities_id: [],
      };

      return this.createToken(user);
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Email already exists !');
      } else {
        throw new ConflictException('User not created !');
      }
    }
  }
}
