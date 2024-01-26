import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @ApiProperty()
  @IsUUID()
  lastLessonId: string;

  @ApiProperty()
  @IsUUID()
  lastSectionId: string;
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