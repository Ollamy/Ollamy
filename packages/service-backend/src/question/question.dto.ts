import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  AnswerType,
  QuestionType,
  QuestionDifficulty,
} from '@prisma/client';

abstract class BaseQuestion {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The title of the question' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the question', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The type of answer for the question', enum: AnswerType })
  @IsEnum(AnswerType)
  typeAnswer: AnswerType;

  @ApiProperty({ description: 'The type of question', enum: QuestionType })
  @IsEnum(QuestionType)
  typeQuestion: QuestionType;

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
    enum: QuestionDifficulty,
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

export class QuestionModel extends BaseQuestion { }

export class GetQuestionModel implements Omit<BaseQuestion, 'id'> {
  @ApiProperty({ description: 'The lesson id of the question' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ description: 'The title of the question' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the question', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'The type of answer for the question', enum: AnswerType })
  @IsEnum(AnswerType)
  typeAnswer: AnswerType;

  @ApiProperty({ description: 'The type of question', enum: QuestionType })
  @IsEnum(QuestionType)
  typeQuestion: QuestionType;

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
    enum: QuestionDifficulty,
  })
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty({ description: 'The order of the question', required: false })
  @IsOptional()
  @IsUUID()
  trust_answer_id?: string;

  @ApiProperty({ description: 'The order of the question' })
  @IsString()
  order: string;

  @ApiProperty({ description: 'The points for the question', required: false })
  @IsNumber()
  @IsOptional()
  points?: number;
}

export class LessonLectureModel {
  @ApiProperty({ description: 'The unique identifier of the lecture' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The data of the lecture' })
  @IsString()
  data: string;
}

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

  @ApiProperty({ enum: AnswerType })
  @IsString()
  typeAnswer: AnswerType;

  @ApiProperty({ enum: QuestionType })
  @IsString()
  typeQuestion: QuestionType;

  @ApiProperty({ required: false })
  @IsOptional()
  picture?: string;

  @ApiProperty({ required: false, enum: QuestionDifficulty })
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
}

export class IdQuestionModel {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;
}

export class UpdateQuestionModel {
  @ApiProperty({
    description: 'The unique identifier of the lesson',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  lessonId?: string;

  @ApiProperty({ description: 'The title of the question', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The description of the question',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, enum: AnswerType })
  @IsString()
  @IsOptional()
  typeAnswer?: AnswerType;

  @ApiProperty({ required: false, enum: QuestionType })
  @IsString()
  @IsOptional()
  typeQuestion?: QuestionType;

  @ApiProperty({ required: false })
  @IsOptional()
  picture?: string;

  @ApiProperty({ required: false, enum: QuestionDifficulty })
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
  @IsOptional()
  @IsUUID()
  trustAnswerId?: string;
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

  @ApiProperty({ description: 'The unique identifier of the answer', required: false})
  @IsUUID()
  @IsOptional()
  answerId?: string;

  @ApiProperty({ description: 'The data of the answer', required: false })
  @IsString()
  @IsOptional()
  data?: string;
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
