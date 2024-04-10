import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
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
  lesson_id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  type_answer: AnswerType;

  @ApiProperty()
  type_question: QuestionType;

  @ApiProperty()
  @IsUUID()
  trust_answer_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture_id?: string;

  @ApiProperty()
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty()
  @IsString()
  order: string;

  @ApiProperty()
  @IsNumber()
  points?: number;
}

export class LectureModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  lesson_id: string;

  @ApiProperty()
  @IsString()
  data: string;
}

export class BetweenOrder {
  @ApiProperty()
  @IsString()
  @IsOptional()
  before?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  after?: string | null;
}

export class CreateQuestionModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  lesson_id: string;

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
  type_answer: AnswerType;

  @ApiProperty()
  @IsString()
  type_question: QuestionType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  between: BetweenOrder;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  points?: number;
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
  lesson_id?: string;

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
  trust_answer_id?: string;
}

export class UpdateQuestionOrderModel {
  @ApiProperty()
  @IsString()
  @IsOptional()
  after?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  before?: string | null;

  @ApiProperty()
  @IsUUID()
  origin: string;
}

export class QuestionIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class validateAnswerModel {
  @ApiProperty()
  @IsUUID()
  question_id: string;

  @ApiProperty()
  @IsUUID()
  answer_id: string;
}

export class ValidateAnswerResponse {
  @ApiProperty({
    name: 'success',
    description: 'Boolean if the answer is true or false',
  })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    name: 'answer',
    description: 'true answer id',
  })
  @IsUUID()
  answer: string;

  @ApiProperty({
    name: 'end',
    description: 'Boolean if it is the last question or not',
  })
  @IsBoolean()
  end: boolean;

  @ApiProperty({
    name: 'nextQuestionId',
    description: 'Id of the next question if it is not the last one',
  })
  @IsString()
  @IsOptional()
  next_question_id?: string | undefined;

  @ApiProperty({
    name: 'points',
    description: 'Points scored in the last question',
  })
  @IsString()
  @IsOptional()
  points?: number | undefined;

  @ApiProperty({
    name: 'hp',
    description: `User's remaining hp`,
  })
  @IsNumber()
  hp?: number | undefined;
}
