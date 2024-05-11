import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
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
  title: string;

  @ApiProperty({ description: 'The description of the question' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The type of answer for the question' })
  @IsEnum(AnswerType)
  typeAnswer: AnswerType;

  @ApiProperty({ description: 'The type of question' })
  @IsEnum(QuestionType)
  typeQuestion: QuestionType;

  @ApiProperty({ description: 'The text of the question', required: false })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    description: 'The URL of the video for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'The URL of the image for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'The URL of the audio for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  audioUrl?: string;

  @ApiProperty({ description: 'The unique identifier of the trusted answer' })
  @IsUUID()
  trustAnswerId: string;

  @ApiProperty({
    description: 'The unique identifier of the picture',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  pictureId?: string;

  @ApiProperty({
    description: 'The difficulty level of the question',
    required: false,
  })
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

export class betweenOrder {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  before?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  after?: string | null;
}

export class CreateQuestionModel {
  @ApiProperty({ description: 'The unique identifier of the lesson' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'The title of the question' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the question' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  typeAnswer: AnswerType;

  @ApiProperty()
  @IsString()
  typeQuestion: QuestionType;

  @ApiProperty({ required: false })
  @IsOptional()
  picture?: string;

  @ApiProperty({ required: false })
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  points?: number;

  @ApiProperty({
    description: 'The unique identifier of the trusted answer',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  trustAnswerId: string;

  @ApiProperty({ description: 'The text of the question', required: false })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    description: 'The URL of the video for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'The URL of the image for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'The URL of the audio for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  audioUrl?: string;
}

export class IdQuestionModel {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;
}

export class UpdateQuestionModel {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The unique identifier of the lesson',
    required: false,
  })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'The title of the question', required: false })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the question',
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  typeAnswer: AnswerType;

  @ApiProperty({ required: false })
  @IsString()
  typeQuestion: QuestionType;

  @ApiProperty({ required: false })
  @IsOptional()
  picture?: string;

  @ApiProperty({ required: false })
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  points?: number;

  @ApiProperty({
    description: 'The unique identifier of the trusted answer',
    required: false,
  })
  @IsUUID()
  trustAnswerId: string;

  @ApiProperty({ description: 'The text of the question', required: false })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    description: 'The URL of the video for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'The URL of the image for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'The URL of the audio for the question',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  audioUrl?: string;
}

export class UpdateQuestionOrderModel {
  @ApiProperty({
    description: 'The order after the current order',
    required: false,
  })
  @IsString()
  @IsOptional()
  after?: string | null;

  @ApiProperty({
    description: 'The order before the current order',
    required: false,
  })
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

  @ApiProperty({
    description:
      'The unique identifier of the next question if it is not the last one',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  nextQuestionId?: string | undefined;

  @ApiProperty({
    description: 'Points scored in the last question',
    required: false,
  })
  @IsString()
  @IsOptional()
  points?: number | undefined;

  @ApiProperty({ description: `User's remaining hp`, required: false })
  @IsNumber()
  @IsOptional()
  hp?: number | undefined;
}
