import {
  Injectable,
  Logger,
  NotAcceptableException,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import prisma from 'client';
import { Reflector } from '@nestjs/core';
import { MIDDLEWARE_KEY } from './middleware.decorator';
import SessionService from '../redis/session/session.service';

const detectDevice = (userAgent: string) => {
  const isMobile = /Mobile|Android|iP(hone|od)/.test(userAgent);
  const isTablet = /iPad|Tablet/.test(userAgent);
  const isPhone = isMobile && !isTablet;
  const os = /Windows/.test(userAgent)
    ? 'Windows'
    : /Macintosh/.test(userAgent)
    ? 'Mac'
    : /Android/.test(userAgent)
    ? 'Android'
    : /Linux/.test(userAgent)
    ? 'Linux'
    : /iPhone|iPad|iPod/.test(userAgent)
    ? 'iOS'
    : 'Unknown';

  return {
    isPhone,
    isTablet,
    isMobile: isPhone || isTablet,
    os,
    userAgent,
  };
};

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
    const token: string = req.cookies.session;

    if (!token) {
      Logger.error('No token provided');
      throw new NotAcceptableException('No token provided');
    }

    const data = await SessionService.get(token);

    if (!data) {
      Logger.error('Invalid Token');
      throw new NotAcceptableException('Invalid Token');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      Logger.error('User does not exists for this token !');
      throw new NotAcceptableException('Invalid Token');
    }

    req.__user = user;

    req.__device = detectDevice(req.headers['user-agent']);

    const userToCourse = await prisma.usertoCourse.findMany({
      where: {
        user_id: req.__user.id,
      },
    });

    if (!userToCourse) {
      Logger.error('Cannot find course for this user !');
      throw new NotAcceptableException('Invalid Token');
    }
    req.__userToCourse = userToCourse;

    return true;
  }
}
