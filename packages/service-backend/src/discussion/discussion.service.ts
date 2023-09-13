import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DiscussionModel,
  UserDiscussionsModel,
  MessageModel,
  CreateDiscussionModel,
} from './discussion.dto';
import { Discussion, Message, UserDiscussions, User } from '@prisma/client';
import prisma from 'client';

@Injectable()
export class DiscussionService {
  async postDiscussion(discussionData: CreateDiscussionModel): Promise<string> {
    try {
      const discussionDb = await prisma.discussion.create({
        data: {
          title: discussionData.title,
          image_url: discussionData.imageUrl,
        },
      });

      if (!discussionDb) {
        Logger.error('Failed to create course !');
        throw new NotFoundException('Failed to create course !');
      }

      discussionData.userIds.forEach(async (userId) => {
        await this.postUserDiscussion(userId, discussionDb.id);
      });
      return `Discussion created with id ${discussionDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not created !');
    }
  }

  async postUserDiscussion(userId: string, discussionId: string) {
    try {
      const userDiscussionDb = await prisma.userDiscussions.create({
        data: {
          user_id: userId,
          discussion_id: discussionId,
        },
      });

      if (!userDiscussionDb) {
        Logger.error('Failed to create user discussion !');
        throw new NotFoundException('Failed to create user discussion !');
      }
      return 'User Discussion created';
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User Discussion not created !');
    }
  }

  async postDiscussionMessage(
    userId: string,
    discussionId: string,
    content: string,
  ) {
    try {
      // Check if the user is part of the discussion
      const isUserInDiscussion = await prisma.userDiscussions.findFirst({
        where: {
          user_id: userId,
          discussion_id: discussionId,
        },
      });

      if (!isUserInDiscussion) {
        Logger.error('User is not part of the discussion!');
        throw new NotFoundException('User is not part of the discussion!');
      }

      // Create the user message
      const userMessageDb = await prisma.message.create({
        data: {
          owner_id: userId,
          content: content,
          discussion_id: discussionId,
        },
      });

      if (!userMessageDb) {
        Logger.error('Failed to create user message!');
        throw new NotFoundException('Failed to create user message!');
      }

      return 'User Message created';
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User Message not created!');
    }
  }
}
