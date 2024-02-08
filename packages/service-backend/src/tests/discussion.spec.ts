import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { DiscussionService } from 'discussion/discussion.service';
import { CreateDiscussionModel } from 'discussion/discussion.dto';
import { Discussion, UserDiscussions, Message } from '@prisma/client';
import { context } from 'tests/data/user.data';
import {
  mockDiscussionData,
  mockDiscussionDb,
  mockUserDiscussionDb,
  mockMessage,
  mockUserDiscussion,
  discussionId,
} from 'tests/data/discussion.data';
import prisma from 'client';

describe('DiscussionService', () => {
  let discussionService: DiscussionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionService],
    }).compile();

    discussionService = module.get<DiscussionService>(DiscussionService);
  });

  describe('postDiscussion', () => {
    it('should create a discussion and user discussions', async () => {
      jest
        .spyOn(prisma.discussion, 'create')
        .mockResolvedValue(mockDiscussionDb);
      jest
        .spyOn(prisma.userDiscussions, 'create')
        .mockResolvedValue(mockUserDiscussionDb);

      // Invoke the function being tested
      const result = await discussionService.postDiscussion(mockDiscussionData);

      // Perform assertions
      expect(prisma.discussion.create).toHaveBeenCalledTimes(1);
      expect(prisma.discussion.create).toHaveBeenCalledWith({
        data: {
          title: mockDiscussionData.title,
          image_url: mockDiscussionData.imageUrl,
        },
      });

      expect(prisma.userDiscussions.create).toHaveBeenCalledTimes(
        mockDiscussionData.userIds.length,
      );
      expect(prisma.userDiscussions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            user_id: expect.any(String),
            discussion_id: mockDiscussionDb.id,
          },
        }),
      );

      const expectedResponse = mockDiscussionDb.id;
      expect(result).toEqual(expectedResponse);
    });

    it('should throw ConflictException if discussion creation fails', async () => {
      jest.spyOn(prisma.discussion, 'create').mockResolvedValue(null);

      await expect(
        discussionService.postDiscussion(mockDiscussionData),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if an error occurs', async () => {
      jest
        .spyOn(prisma.discussion, 'create')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        discussionService.postDiscussion(mockDiscussionData),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('postUserDiscussion', () => {
    it('should create a user discussion', async () => {
      // Mock the dependencies or services
      jest
        .spyOn(prisma.userDiscussions, 'create')
        .mockResolvedValue(mockUserDiscussionDb);

      // Invoke the function being tested
      const result = await discussionService.postUserDiscussion(
        context.__user.id,
        discussionId,
      );

      // Perform assertions
      expect(prisma.userDiscussions.create).toHaveBeenCalledTimes(4);
      expect(prisma.userDiscussions.create).toHaveBeenCalledWith({
        data: {
          user_id: context.__user.id,
          discussion_id: discussionId,
        },
      });

      expect(result).toEqual('User Discussion created');
    });
  });
  describe('postDiscussionMessage', () => {
    it('should create a user message', async () => {
      // Mock Prisma functions
      jest
        .spyOn(prisma.userDiscussions, 'findFirst')
        .mockResolvedValue(mockUserDiscussion);
      jest.spyOn(prisma.message, 'create').mockResolvedValue(mockMessage);

      // Call the function being tested
      const result = await discussionService.postDiscussionMessage(
        context.__user.id,
        discussionId,
        mockMessage.content,
      );

      // Assertions
      expect(result).toEqual('User Message created');
      expect(prisma.userDiscussions.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: context.__user.id,
          discussion_id: discussionId,
        },
      });
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          owner_id: context.__user.id,
          content: mockMessage.content,
          discussion_id: discussionId,
        },
      });
    });

    it('should throw ConflictException if the user is not part of the discussion', async () => {
      // Mock Prisma function to return null
      jest.spyOn(prisma.userDiscussions, 'findFirst').mockResolvedValue(null);

      // Call the function being tested and expect an exception
      await expect(
        discussionService.postDiscussionMessage(
          context.__user.id,
          discussionId,
          'Test message',
        ),
      ).rejects.toThrow(ConflictException);

      // Assertions
      expect(prisma.userDiscussions.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: context.__user.id,
          discussion_id: discussionId,
        },
      });
    });

    it('should throw ConflictException if message creation fails', async () => {
      // Mock data

      // Mock Prisma functions
      jest
        .spyOn(prisma.userDiscussions, 'findFirst')
        .mockResolvedValue(mockUserDiscussion);
      jest.spyOn(prisma.message, 'create').mockResolvedValue(null);

      // Call the function being tested and expect an exception
      await expect(
        discussionService.postDiscussionMessage(
          context.__user.id,
          discussionId,
          mockMessage.content,
        ),
      ).rejects.toThrow(ConflictException);

      // Assertions
      expect(prisma.userDiscussions.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: context.__user.id,
          discussion_id: discussionId,
        },
      });
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          owner_id: context.__user.id,
          content: mockMessage.content,
          discussion_id: discussionId,
        },
      });
    });
  });
});
