import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  isObject,
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
  lessonId: string;

  @ApiProperty()
  @IsString()
  data: string;
}

export class betweenOrder {
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

  @ApiProperty()
  @IsObject()
  @IsOptional()
  between: betweenOrder;

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
  questionId: string;

  @ApiProperty()
  @IsUUID()
  answerId: string;
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
  nextQuestionId?: string | undefined;

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
