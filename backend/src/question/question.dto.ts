import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { AnswerType, QuestionType } from '@prisma/client';

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

  @ApiProperty()
  @IsString()
  TypeAnswer: AnswerType;

  @ApiProperty()
  @IsString()
  TypeQuestion: QuestionType;
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

export class CreateAnswerModel {
  @ApiProperty()
  @IsString()
  Value: string;

  @ApiProperty()
  @IsUUID()
  QuestionId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  Point: number;
}
