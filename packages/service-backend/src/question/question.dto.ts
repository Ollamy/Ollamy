import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  MaxLength,
} from 'class-validator';
import { AnswerType, QuestionType, QuestionDifficulty } from '@prisma/client';

abstract class BaseQuestion {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The unique identifier of the lesson' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'The title of the question' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'The description of the question' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  description: string;

  @ApiProperty({ description: 'The type of answer for the question' })
  @IsEnum(AnswerType)
  typeAnswer: AnswerType;

  @ApiProperty({ description: 'The type of question' })
  @IsEnum(QuestionType)
  typeQuestion: QuestionType;

  @ApiProperty({ description: 'The unique identifier of the trusted answer' })
  @IsUUID()
  trustAnswerId: string;

  @ApiProperty({ description: 'The unique identifier of the picture', required: false })
  @IsString()
  @IsOptional()
  pictureId?: string;

  @ApiProperty({ description: 'The difficulty level of the question', required: false })
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty({ description: 'The order of the question' })
  @IsString()
  order: string;

  @ApiProperty({ description: 'The points for the question', required: false })
  @IsNumber()
  @IsOptional()
  points?: number;
}

export class QuestionModel extends BaseQuestion {}

export class LectureModel {
  @ApiProperty({ description: 'The unique identifier of the lecture' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The unique identifier of the lesson' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'The data of the lecture' })
  @IsString()
  data: string;
}

export class BetweenOrder {
  @ApiProperty({ description: 'The order before the current order', required: false })
  @IsString()
  @IsOptional()
  before?: string | null;

  @ApiProperty({ description: 'The order after the current order', required: false })
  @IsString()
  @IsOptional()
  after?: string | null;
}

export class CreateQuestionModel extends BaseQuestion {
  @ApiProperty({ description: 'The data of the question' })
  @IsString()
  data: string;
  between: BetweenOrder;
}

export class IdQuestionModel {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;
}

export class UpdateQuestionModel extends BaseQuestion {}

export class UpdateQuestionOrderModel {
  @ApiProperty({ description: 'The order after the current order', required: false })
  @IsString()
  @IsOptional()
  after?: string | null;

  @ApiProperty({ description: 'The order before the current order', required: false })
  @IsString()
  @IsOptional()
  before?: string | null;

  @ApiProperty({ description: 'The origin of the question' })
  @IsUUID()
  origin: string;
}

export class QuestionIdResponse {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;
}

export class ValidateAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  questionId: string;

  @ApiProperty({ description: 'The unique identifier of the answer' })
  @IsUUID()
  answerId: string;
}

export class ValidateAnswerResponse {
  @ApiProperty({ description: 'Indicates if the answer is true or false' })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: 'The unique identifier of the true answer' })
  @IsUUID()
  answer: string;

  @ApiProperty({ description: 'Indicates if it is the last question or not' })
  @IsBoolean()
  end: boolean;

  @ApiProperty({ description: 'The unique identifier of the next question if it is not the last one', required: false })
  @IsString()
  @IsOptional()
  nextQuestionId?: string | undefined;

  @ApiProperty({ description: 'Points scored in the last question', required: false })
  @IsString()
  @IsOptional()
  points?: number | undefined;

  @ApiProperty({ description: `User's remaining hp`, required: false })
  @IsNumber()
  @IsOptional()
  hp?: number | undefined;
}
