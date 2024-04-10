import { Discussion, Message, UserDiscussions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateDiscussionModel } from '@ollamy/backend/discussion/discussion.dto';
import { context } from './user.data';

export const discussionId = uuidv4();

export const mockDiscussionData: CreateDiscussionModel = {
  title: 'Discussion Title',
  image_url: 'https://example.com/image.jpg',
  user_ids: [uuidv4(), uuidv4(), uuidv4()],
};

export const mockDiscussionDb: Discussion = {
  id: discussionId,
  title: mockDiscussionData.title,
  image_url: 'https://example.com/image.jpg',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockUserDiscussionDb: UserDiscussions = {
  user_id: context.__user.id,
  discussion_id: discussionId,
};

export const mockUserDiscussion: UserDiscussions = {
  user_id: context.__user.id,
  discussion_id: discussionId,
};

export const mockMessage: Message = {
  id: uuidv4(),
  owner_id: context.__user.id,
  content: 'Hello, this is a test message',
  discussion_id: discussionId,
  created_at: new Date(),
  updated_at: new Date(),
};
