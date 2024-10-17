import { Test } from '@nestjs/testing';
import prisma from 'client';
import { BadgeController } from 'badge/badge.controller';
import { GetUsersBadges } from 'badge/badge.dto';
import { mockBadgeDb, mockResultBadgeDb } from 'tests/data/badge.data';
import { BadgeService } from 'badge/badge.service';

describe('getBadge', () => {
  let badgeService: BadgeService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BadgeService],
    }).compile();

    badgeService = moduleRef.get<BadgeService>(BadgeService);
  });

  it('I want to verify that the get badge function works', async () => {
    //@ts-ignore
    jest.spyOn(prisma.userBadges, 'findMany').mockResolvedValue(mockBadgeDb);

    // Invoke the function being tested
    const result = await badgeService.getUserBadge({ __user: { id: '1' } });

    // Perform assertions
    expect(prisma.userBadges.findMany).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(mockResultBadgeDb);
  });
});
