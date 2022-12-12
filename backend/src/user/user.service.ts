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
  RegisterUserModel,
  LoginUserModel,
  UpdateUserModel,
  JwtUserModel,
} from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import { createHmac } from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private createToken(userData: JwtUserModel): string {
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
    if (userData.Firstname === '' || userData.Lastname === '') {
      Logger.error('Firstname or lastname not provided !');
      throw new UnprocessableEntityException(
        'Firstname or lastname not provided !',
      );
    }

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

      const user: JwtUserModel = {
        Id: userDb.id,
        Email: userDb.email,
        Firstname: userDb.firstname,
        Lastname: userDb.lastname,
        Password: userDb.password,
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

  async loginUser(userData: LoginUserModel): Promise<string> {
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
    const user: JwtUserModel = {
      Id: userDb.id,
      Email: userDb.email,
      Firstname: userDb.firstname,
      Lastname: userDb.lastname,
      Password: userDb.password,
    };
    return this.createToken(user);
  }

  async updateUser(userData: UpdateUserModel, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    const userDb = await prisma.user.update({
      where: {
        id: parsedJwt['_id'],
      },
      data: {
        password: userData.Password,
        email: userData.Email,
        firstname: userData.Firstname,
        lastname: userData.Lastname,
      },
    });

    const user: JwtUserModel = {
      Id: userDb.id,
      Email: userDb.email,
      Firstname: userDb.firstname,
      Lastname: userDb.lastname,
      Password: userDb.password,
    };
    return this.createToken(user);
  }

  async deleteUser(token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    const userDb = await prisma.user.delete({
      where: {
        id: parsedJwt['_id']
      }
    })

    if (!userDb) {
      Logger.error('User does not exists !');
      throw new NotFoundException('User does not exists !');
    }

    return "Ok .";
  }
}
