import { Test } from '@nestjs/testing';
import prisma from 'client';
import { BadgeController } from 'badge/badge.controller';
import { GetUsersBadges } from 'badge/badge.dto';
import { BadgeService } from 'badge/badge.service';
import { Badge } from '@prisma/client';

export const mockBadgeDb: {
  user_id: String;
  badge_id: String;
  created_at: Date;
  badge: Badge;
}[] = [
  {
    user_id: '1',
    badge_id: '1',
    created_at: new Date(),
    badge: {
      id: '1',
      name: 'maxime',
      description: 'test description',
      image_name: 'image name',
      order: 0,
      color: 'color',
    },
  },
];

export const mockResultBadgeDb: { badges: Badge[] } = {
  badges: [
    {
      id: '1',
      name: 'maxime',
      description: 'test description',
      image_name: 'image name',
      order: 0,
      color: 'color',
    },
  ],
};
