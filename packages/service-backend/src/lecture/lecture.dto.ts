import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLectureModel {
  @ApiProperty({ description: 'Lesson ID' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'Lecture data' })
  @IsString()
  data: string;
}

export class UpdateLectureModel {
  @ApiProperty({ description: 'Lesson ID' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'Updated lecture data' })
  @IsString()
  data?: string;
}

export class IdLectureModel {
  @ApiProperty({ description: 'ID of the lecture' })
  @IsUUID()
  id: string;
}

export class LectureModel {
  @ApiProperty({ description: 'Lesson ID' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'Lecture data' })
  @IsString()
  data: string;
}

export class LectureIdResponse {
  @ApiProperty({ description: 'ID of the created/updated lecture' })
  @IsUUID()
  id: string;
}
