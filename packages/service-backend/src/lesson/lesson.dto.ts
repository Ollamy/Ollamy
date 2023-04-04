import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class LessonModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  chapterId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class CreateLessonModel {
  @ApiProperty()
  @IsUUID()
  chapterId: string;

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
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  chapterId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
