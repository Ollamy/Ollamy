import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionModel, MessageModel } from './discussion.dto';
import { Discussion, UserDiscussions, Message } from '@prisma/client';
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
      // Mock the dependencies or services
      const mockDiscussionData: CreateDiscussionModel = {
        title: 'Discussion Title',
        imageUrl: 'https://example.com/image.jpg',
        userIds: ['1', '2', '3'],
      };
      const mockDiscussionDb: Discussion = {
        id: '1',
        title: 'Discussion Title',
        image_url: 'https://example.com/image.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const mockUserDiscussionDb: UserDiscussions = {
        user_id: '1',
        discussion_id: '1',
      };
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

      const mockDiscussionData: CreateDiscussionModel = {
        title: 'Discussion Title',
        imageUrl: 'https://example.com/image.jpg',
        userIds: ['1', '2', '3'],
      };

      await expect(
        discussionService.postDiscussion(mockDiscussionData),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if an error occurs', async () => {
      jest
        .spyOn(prisma.discussion, 'create')
        .mockRejectedValue(new Error('Some error'));

      const mockDiscussionData: CreateDiscussionModel = {
        title: 'Discussion Title',
        imageUrl: 'https://example.com/image.jpg',
        userIds: ['1', '2', '3'],
      };

      await expect(
        discussionService.postDiscussion(mockDiscussionData),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('postUserDiscussion', () => {
    it('should create a user discussion', async () => {
      // Mock the dependencies or services
      const mockUserId = '1';
      const mockDiscussionId = '1';
      const mockUserDiscussionDb: UserDiscussions = {
        user_id: mockUserId,
        discussion_id: mockDiscussionId,
      };
      jest
        .spyOn(prisma.userDiscussions, 'create')
        .mockResolvedValue(mockUserDiscussionDb);

      // Invoke the function being tested
      const result = await discussionService.postUserDiscussion(
        mockUserId,
        mockDiscussionId,
      );

      // Perform assertions
      expect(prisma.userDiscussions.create).toHaveBeenCalledTimes(4);
      expect(prisma.userDiscussions.create).toHaveBeenCalledWith({
        data: {
          user_id: mockUserId,
          discussion_id: mockDiscussionId,
        },
      });

      expect(result).toEqual('User Discussion created');
    });
  });
  describe('postDiscussionMessage', () => {
    it('should create a user message', async () => {
      // Mock data
      const userId = '1';
      const discussionId = '1';
      const content = 'Hello, this is a test message';
      const mockUserDiscussion: UserDiscussions = {
        user_id: userId,
        discussion_id: discussionId,
      };
      const mockMessage: Message = {
        id: '1',
        owner_id: userId,
        content,
        discussion_id: discussionId,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mock Prisma functions
      jest
        .spyOn(prisma.userDiscussions, 'findFirst')
        .mockResolvedValue(mockUserDiscussion);
      jest.spyOn(prisma.message, 'create').mockResolvedValue(mockMessage);

      // Call the function being tested
      const result = await discussionService.postDiscussionMessage(
        userId,
        discussionId,
        content,
      );

      // Assertions
      expect(result).toEqual('User Message created');
      expect(prisma.userDiscussions.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          discussion_id: discussionId,
        },
      });
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          owner_id: userId,
          content,
          discussion_id: discussionId,
        },
      });
    });

    it('should throw ConflictException if the user is not part of the discussion', async () => {
      // Mock data
      const userId = '1';
      const discussionId = '1';

      // Mock Prisma function to return null
      jest.spyOn(prisma.userDiscussions, 'findFirst').mockResolvedValue(null);

      // Call the function being tested and expect an exception
      await expect(
        discussionService.postDiscussionMessage(
          userId,
          discussionId,
          'Test message',
        ),
      ).rejects.toThrow(ConflictException);

      // Assertions
      expect(prisma.userDiscussions.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          discussion_id: discussionId,
        },
      });
    });

    it('should throw ConflictException if message creation fails', async () => {
      // Mock data
      const userId = '1';
      const discussionId = '1';
      const content = 'Hello, this is a test message';
      const mockUserDiscussion: UserDiscussions = {
        user_id: userId,
        discussion_id: discussionId,
      };

      // Mock Prisma functions
      jest
        .spyOn(prisma.userDiscussions, 'findFirst')
        .mockResolvedValue(mockUserDiscussion);
      jest.spyOn(prisma.message, 'create').mockResolvedValue(null);

      // Call the function being tested and expect an exception
      await expect(
        discussionService.postDiscussionMessage(userId, discussionId, content),
      ).rejects.toThrow(ConflictException);

      // Assertions
      expect(prisma.userDiscussions.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          discussion_id: discussionId,
        },
      });
      expect(prisma.message.create).toHaveBeenCalledWith({
        data: {
          owner_id: userId,
          content,
          discussion_id: discussionId,
        },
      });
    });
  });
});
