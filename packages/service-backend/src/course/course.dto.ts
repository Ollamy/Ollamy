// eslint-disable-next-line max-classes-per-file
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CourseModel {
  @ApiProperty()
  @IsUUID()
  ownerId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  picture: string;
}

export class GetCourseRequest extends CourseModel {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  lastLessonId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  lastSectionId?: string;

  @ApiProperty()
  @IsNumber()
  numberOfUsers: number;

  @ApiProperty({ required: false, enum: Status })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

export class CreateCourseModel {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class IdCourseModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateCourseModel {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  ownerId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  picture?: string | null;
}

export class CourseIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class CourseTrueResponse {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}

export class UserCourseHp {
  @ApiProperty()
  @IsNumber()
  hp: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  timer?: string;
}

export enum Durationtype {
  FIFTEEN_MINUTES = 'FIFTEEN_MINUTES',
  ONE_HOUR = 'ONE_HOUR',
  TWELVE_HOURS = 'TWELVE_HOURS',
  ONE_DAY = 'ONE_DAY',
  ONE_WEEK = 'ONE_WEEK',
}

export const ExpirationMap: Record<Durationtype, number> = {
  [Durationtype.FIFTEEN_MINUTES]: 15 * 60,
  [Durationtype.ONE_HOUR]: 60 * 60,
  [Durationtype.TWELVE_HOURS]: 12 * 60 * 60,
  [Durationtype.ONE_DAY]: 24 * 60 * 60,
  [Durationtype.ONE_WEEK]: 7 * 24 * 60 * 60,
};

export class CourseGenerateCode {
  @ApiProperty({ description: `Code's expiration time`, enum: Durationtype })
  @IsEnum(Durationtype)
  duration: Durationtype;
}

export class ShareCourseCode {
  @ApiProperty({ description: `Course's sharing code` })
  @IsString()
  code: string;

  @ApiProperty({ description: `Code's date of expiration`, type: Date })
  @IsDate()
  expiresAt: Date;
}

export class CourseCodeModel {
  @ApiProperty({ description: `Course's sharing code`, required: false })
  @IsString()
  @IsOptional()
  code?: string;
}
