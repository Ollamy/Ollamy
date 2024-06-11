import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class LessonModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNumber()
  numberOfQuestions: number;

  @ApiProperty()
  @IsNumber()
  numberOfLectures: number;
}

export class CreateLessonModel {
  @ApiProperty()
  @IsUUID()
  sectionId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class IdLessonModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateLessonModel {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  sectionId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class JoinLessonModel {
  @ApiProperty()
  @IsUUID()
  userId: string;
}

export class LessonIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}
