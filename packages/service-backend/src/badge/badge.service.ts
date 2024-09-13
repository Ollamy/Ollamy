import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import prisma from 'client';
import { BadgeModel, GetUsersBadges } from './badge.dto';

@Injectable()
export class BadgeService {
  async getUserBadge(ctx: any): Promise<GetUsersBadges> {
    try {
      const res = await prisma.userBadges.findMany({
        where: {
          user_id: ctx.__user.id,
        },
        include: {
          badge: true,
        },
        orderBy: {
          badge: {
            order: 'asc',
          },
        },
      });

      return { badges: res.map((row) => row.badge) };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Fail to retrieve badges!');
    }
  }

  async getBadge(badgeId: string): Promise<BadgeModel> {
    try {
      const badge: BadgeModel = await prisma.badge.findUnique({
        where: {
          id: badgeId,
        },
      });

      return badge;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Fail to retrieve badges!');
    }
  }
}
