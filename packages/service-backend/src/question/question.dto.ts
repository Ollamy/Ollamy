import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { AnswerType, QuestionType } from '@prisma/client';

export class QuestionModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  lessonId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  data: string;

  @ApiProperty()
  typeAnswer: AnswerType;

  @ApiProperty()
  typeQuestion: QuestionType;

  @ApiProperty()
  @IsUUID()
  trustAnswerId: string;
}

export class CreateQuestionModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  lessonId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  data: string;

  @ApiProperty()
  @IsString()
  typeAnswer: AnswerType;

  @ApiProperty()
  @IsString()
  typeQuestion: QuestionType;
}

export class IdQuestionModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateQuestionModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  lessonId: string;

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
  @IsOptional()
  data: string;
}

export class CreateAnswerModel {
  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsUUID()
  questionId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  point: number;
}
