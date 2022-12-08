import * as jwt from 'jsonwebtoken';
import { Logger, ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserModel } from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import * as sha256 from 'crypto-js/sha256';

@Injectable()
export class UserService {
  createToken(userData: UserModel): string {
    const token = jwt.sign(
      {
        _id: userData.Id,
        firstname: userData.Firstname,
        lastname: userData.Lastname,
        email: userData.Email,
        password: userData.Password,
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

  validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  hashPassword(password: string): string {
    return sha256(password + SECRET_KEY).toString();
  }

  async postUser(userData: UserModel): Promise<string | null> {
    const isEmail = this.validateEmail(userData.Email);

    if (!isEmail) {
      Logger.error('Email is not valid !');
      throw new UnprocessableEntityException('Email is not valid !');
    }

    const hashedPass = this.hashPassword(userData.Password);

    const user = await prisma.user.findUnique({
      where: {
        email: userData.Email,
      },
    });

    if (user) {
      Logger.error('Email already exists !');
      throw new ConflictException('Email already exists !');
    }

    try {
      const userDb = await prisma.user.create({
        data: {
          password: hashedPass,
          email: userData.Email,
          firstname: userData.Firstname,
          lastname: userData.Lastname,
          communities_id: [],
        },
      });
      userData.Id = userDb.id;
      return this.createToken(userData);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User not created !');
    }
  }
}
