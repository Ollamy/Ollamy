import * as jwt from 'jsonwebtoken';
import { Logger, ConflictException, Injectable, UnprocessableEntityException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserModel } from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  createToken(userData: UserModel): string {
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

  validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  hashPassword(password: string): string {
    const hash = crypto.createHmac('sha512', Buffer.from(SECRET_KEY)).update(password).digest('hex');
    return hash;
  }

  async registerUser(userData: UserModel): Promise<string> {
    if (userData.Firstname === "" || userData.Lastname === "") {
      Logger.error('No firstname or lastname provided !');
      throw new UnprocessableEntityException('No firstname or lastname provided !');
    }

    if (!this.validateEmail(userData.Email)) {
      Logger.error('Email is not valid !');
      throw new UnprocessableEntityException('Email is not valid !');
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userData.Email,
      },
    });

    if (user) {
      Logger.error('Email already exists !');
      throw new ConflictException('Email already exists !');
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
      userData.Id = userDb.id;
      return this.createToken(userData);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User not created !');
    }
  }

  async loginUser(userData: UserModel): Promise<string> {

    const userDb = await prisma.user.findUnique({
      where: {
        email: userData.Email,
      },
    });

    if (!userDb) {
      Logger.error('User does not exists !');
      throw new NotFoundException('User does not exists !');
    }

    userData.Password = this.hashPassword(userData.Password);

    if (userData.Password !== userDb.password) {
      Logger.error('Wrong password !');
      throw new BadRequestException('Wrong password !');
    }
    userData.Id = userDb.id;
    userData.Firstname = userDb.firstname;
    userData.Lastname = userDb.lastname;
    return this.createToken(userData);
  }

  async updateUser(userData: UserModel): Promise<string> {
    return "";
  }
}