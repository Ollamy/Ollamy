import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QuestionModel {
  @ApiProperty()
  @IsUUID()
  Id: string;

  @ApiProperty()
  @IsUUID()
  LessonId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;

  @ApiProperty()
  @IsString()
  Data: string;
}

export class CreateQuestionModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  LessonId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;

  @ApiProperty()
  @IsString()
  Data: string;
}

export class IdQuestionModel {
  @ApiProperty()
  @IsUUID()
  Id: string;
}

export class UpdateQuestionModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  LessonId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Data: string;
}
