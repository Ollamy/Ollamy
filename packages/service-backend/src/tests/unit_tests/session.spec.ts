import { Test } from '@nestjs/testing';
import prisma from 'client';
import { NotFoundException } from '@nestjs/common';
import {
  mockGetUserSession,
  mockSessionId,
  mockUserSession,
} from 'tests/data/session.data';

import { TasksService } from 'cron/cron.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SessionService } from 'session/session.service';
import { mockLessonId } from '../data/lesson.data';
import { context } from '../data/user.data';

describe('createSession', () => {
  let sessionService: SessionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SessionService, TasksService, SchedulerRegistry],
    }).compile();

    sessionService = moduleRef.get<SessionService>(SessionService);
  });

  it('should throw NotFoundException if session creation fails', async () => {
    jest.spyOn(prisma.lesson, 'findUnique').mockResolvedValue(null);

    await expect(
      sessionService.createSession(mockLessonId, context),
    ).rejects.toThrow(NotFoundException);
  });
});

describe('getSession', () => {
  let sessionService: SessionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SessionService, TasksService, SchedulerRegistry],
    }).compile();

    sessionService = moduleRef.get<SessionService>(SessionService);
  });

  it('should return a session model when the session exists', async () => {
    // Mock the dependencies or services

    jest
      .spyOn(prisma.userSession, 'findUnique')
      .mockResolvedValue(mockUserSession);

    // Invoke the function being tested
    const result = await sessionService.getSession(mockSessionId);

    // Perform assertions
    expect(prisma.userSession.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.userSession.findUnique).toHaveBeenCalledWith({
      where: { id: mockSessionId },
      select: {
        current_question_id: true,
        correct_answers: true,
        total_questions: true,
      },
    });

    expect(result).toEqual(mockGetUserSession);
  });

  it('should throw NotFoundException if the session does not exist', async () => {
    jest.spyOn(prisma.userSession, 'findUnique').mockResolvedValue(null);

    await expect(sessionService.getSession(mockSessionId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
