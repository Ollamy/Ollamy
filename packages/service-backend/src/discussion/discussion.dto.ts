import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  isString,
} from 'class-validator';

export class DiscussionModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  imageUrl: string;
}

export class CreateDiscussionModel {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;
  @ApiProperty()
  @IsArray()
  userIds: string[];
}

export class UserDiscussionsModel {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  discussionId: string;
}

export class MessageModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty()
  @IsUUID()
  discussionId: string;

  @ApiProperty()
  @IsUUID()
  ownerId: string;

  @ApiProperty()
  @IsString()
  content: string;
}
