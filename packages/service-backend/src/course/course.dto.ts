// eslint-disable-next-line max-classes-per-file
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  lastLessonId?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  lastSectionId?: string;
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  picture?: string;
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
  timer: string;
}
