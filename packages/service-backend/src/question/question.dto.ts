import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AnswerType, QuestionType, QuestionDifficulty } from '@prisma/client';

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
  typeAnswer: AnswerType;

  @ApiProperty()
  typeQuestion: QuestionType;

  @ApiProperty()
  @IsUUID()
  trustAnswerId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pictureId?: string;

  @ApiProperty()
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;
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

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;
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
  lessonId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  points?: number;

  @ApiProperty()
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  trustAnswerId?: string;
}

export class QuestionIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}
