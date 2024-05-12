import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SuccessBody {
  @ApiProperty({ description: 'Result of the request' })
  success: boolean;
}

export abstract class BaseDiscussionModel {
  @ApiProperty({ description: 'The unique identifier of the discussion' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The creation date of the discussion' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ description: 'The last update date of the discussion' })
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ description: 'The title of the discussion' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The URL of the image associated with the discussion' })
  @IsString()
  imageUrl: string;
}

export class DiscussionModel extends BaseDiscussionModel {}

export class CreateDiscussionModel {
  @ApiProperty({ description: 'The title of the discussion', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The URL of the image associated with the discussion', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'List of user IDs associated with the discussion' })
  @IsArray()
  userIds: string[];
}

export class UserDiscussionsModel {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'The unique identifier of the discussion' })
  @IsUUID()
  discussionId: string;
}

export abstract class BaseMessageModel {
  @ApiProperty({ description: 'The unique identifier of the message' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The creation date of the message' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ description: 'The last update date of the message' })
  @IsDateString()
  updatedAt: string;

  @ApiProperty({ description: 'The unique identifier of the discussion associated with the message' })
  @IsUUID()
  discussionId: string;

  @ApiProperty({ description: 'The unique identifier of the owner of the message' })
  @IsUUID()
  ownerId: string;

  @ApiProperty({ description: 'The content of the message' })
  @IsString()
  content: string;
}

export class MessageModel extends BaseMessageModel {}
