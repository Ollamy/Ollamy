import {
  Injectable,
  Logger,
  NotAcceptableException,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import prisma from 'client';
import { SECRET_KEY } from 'setup';
import { Reflector } from '@nestjs/core';
import { MIDDLEWARE_KEY } from './middleware.decorator';

@Injectable()
export class MiddlewareGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allow = this.reflector.getAllAndOverride<boolean>(MIDDLEWARE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!allow) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token: string = req.headers.authorization_token as string;

    if (!token) {
      Logger.error('No token provided');
      throw new NotAcceptableException('No token provided');
    }

    try {
      const verify = jwt.verify(token, SECRET_KEY);

      if (!verify) {
        Logger.error('Invalid Token');
        throw new NotAcceptableException('Invalid Token');
      }
    } catch (error) {
      Logger.error('Jwt not accepted, can be malformed, expired or invalid');
      throw new NotAcceptableException(
        'Jwt not accepted, can be malformed, expired or invalid',
      );
    }

    const parsedJwt = jwt.decode(token);
    const user = prisma.user.findUnique({
      where: {
        id: parsedJwt['id'],
      },
    });

    if (!user) {
      Logger.error('User does not exists for this token !');
      throw new NotAcceptableException('Invalid Token');
    }

    req.__user = await user;

    const userToCourse = prisma.usertoCourse.findMany({
      where: {
        user_id: req.__user.id,
      },
    });

    if (!userToCourse) {
      Logger.error('Cannot find course for this user !');
      throw new NotAcceptableException('Invalid Token');
    }
    req.__userToCourse = await userToCourse;
    return true;
  }
}
