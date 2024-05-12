import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseCourseModel {
  @ApiProperty({ description: 'The unique identifier of the course owner' })
  @IsUUID()
  ownerId: string;

  @ApiProperty({ description: 'The title of the course' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The picture representing the course', required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class CourseModel extends BaseCourseModel {
  @ApiProperty({ description: 'The URL of the picture representing the course' })
  @IsString()
  picture: string;
}

export class GetCourseRequest extends BaseCourseModel {
  @ApiProperty({ description: 'The unique identifier of the last lesson taken by the user', required: false })
  @IsUUID()
  @IsOptional()
  lastLessonId?: string;

  @ApiProperty({ description: 'The unique identifier of the last section taken by the user', required: false })
  @IsUUID()
  @IsOptional()
  lastSectionId?: string;
}

export class CreateCourseModel {
  @ApiProperty({ description: 'The title of the course' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The picture representing the course', required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class IdCourseModel {
  @ApiProperty({ description: 'The unique identifier of the course' })
  @IsUUID()
  id: string;
}

export class UpdateCourseModel extends BaseCourseModel { }

export class CourseIdResponse {
  @ApiProperty({ description: 'The unique identifier of the course' })
  @IsUUID()
  id: string;
}

export class CourseTrueResponse {
  @ApiProperty({ description: 'Indicates if the operation was successful or not' })
  @IsBoolean()
  success: boolean;
}

export class UserCourseHp {
  @ApiProperty({ description: 'The health points of the user for the course' })
  @IsNumber()
  hp: number;

  @ApiProperty({ description: 'The timer for the user in the course' })
  @IsString()
  timer: string;
}
