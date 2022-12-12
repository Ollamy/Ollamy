import {
  Injectable,
  NestMiddleware,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import prisma from 'client';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const token: string = req.headers.authorization_token as string;
    console.log('token = ', token);

    if (token === undefined) {
      Logger.error('No token provided');
      throw new NotAcceptableException('No token provided');
    }
    const parsedJwt = jwt.decode(token);

    const user = prisma.user.findUnique({
      where: {
        id: parsedJwt['_id'],
        email: parsedJwt['email'],
      },
    });

    console.log(parsedJwt);
    if (!user) {
      Logger.error('User does not exists !');
      throw new NotAcceptableException('Invalid Token');
    }
    console.log('Request Received');
    next();
  }
}
