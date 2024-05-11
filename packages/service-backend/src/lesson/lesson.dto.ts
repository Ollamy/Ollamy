import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

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
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  sectionId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
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
