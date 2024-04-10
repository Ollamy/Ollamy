import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class DiscussionModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDateString()
  created_at: string;

  @ApiProperty()
  @IsDateString()
  updated_at: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  image_url: string;
}

export class CreateDiscussionModel {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty()
  @IsArray()
  user_ids: string[];
}

export class UserDiscussionsModel {
  @ApiProperty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsUUID()
  discussion_id: string;
}

export class MessageModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDateString()
  created_at: string;

  @ApiProperty()
  @IsDateString()
  updated_at: string;

  @ApiProperty()
  @IsUUID()
  discussion_id: string;

  @ApiProperty()
  @IsUUID()
  owner_id: string;

  @ApiProperty()
  @IsString()
  content: string;
}
