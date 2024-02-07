import { Discussion, UserDiscussions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateDiscussionModel } from '@ollamy/backend/discussion/discussion.dto';

export const userId = uuidv4();

export const mockDiscussionData: CreateDiscussionModel = {
    title: 'Discussion Title',
    imageUrl: 'https://example.com/image.jpg',
    userIds: ['1', '2', '3'],
};

export const mockDiscussionDb: Discussion = {
    id: '1',
    title: 'Discussion Title',
    image_url: 'https://example.com/image.jpg',
    created_at: new Date(),
    updated_at: new Date(),
};

export const mockUserDiscussionDb: UserDiscussions = {
    user_id: '1',
    discussion_id: '1',
};

export const mockUserId = '1';
export const mockDiscussionId = '1';
export const content = 'Hello, this is a test message';
export const mockUserDiscussion: UserDiscussions = {
    user_id: userId,
    discussion_id: mockDiscussionId,
};