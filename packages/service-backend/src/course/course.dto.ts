// eslint-disable-next-line max-classes-per-file
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CourseModel {
  @ApiProperty()
  @IsUUID()
  id: string;

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

  @ApiProperty()
  @IsString()
  picture?: string;
}

export class IdCourseModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateCourseModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  ownerId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  picture: string;
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
