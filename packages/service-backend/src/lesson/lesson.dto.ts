import { ApiProperty } from '@nestjs/swagger';
import { LessonStatus } from '@prisma/client';
import { IsNumber, IsOptional, IsString, IsUUID, IsBoolean, IsArray, ValidateNested } from 'class-validator';

export class BaseLessonModel {
  @ApiProperty({ description: 'The unique identifier of the lesson' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The title of the lesson' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the lesson' })
  @IsString()
  description: string;
}

export class LessonModel extends BaseLessonModel {
  @ApiProperty({ description: 'The status of the lesson', enum: LessonStatus })
  @IsString()
  status: LessonStatus;

  @ApiProperty({ description: 'The number of questions in the lesson' })
  @IsNumber()
  numberOfQuestions: number;

  @ApiProperty({ description: 'The number of lectures in the lesson' })
  @IsNumber()
  numberOfLectures: number;
}

export class CreateLessonModel {
  @ApiProperty({ description: 'The unique identifier of the section to which the lesson belongs' })
  @IsUUID()
  sectionId: string;

  @ApiProperty({ description: 'The title of the lesson' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the lesson' })
  @IsString()
  description: string;
}

export class IdLessonModel {
  @ApiProperty({ description: 'The unique identifier of the lesson' })
  @IsUUID()
  id: string;
}

export class UpdateLessonModel {
  @ApiProperty({ description: 'The unique identifier of the section to which the lesson belongs', required: false })
  @IsUUID()
  @IsOptional()
  sectionId?: string;

  @ApiProperty({ description: 'The title of the lesson', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the lesson', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class JoinLessonModel {
  @ApiProperty({ description: 'The unique identifier of the user joining the lesson' })
  @IsUUID()
  userId: string;
}

export class LessonIdResponse {
  @ApiProperty({ description: 'The unique identifier of the lesson' })
  @IsUUID()
  id: string;
}
