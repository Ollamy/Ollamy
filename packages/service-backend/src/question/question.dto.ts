import { ApiProperty, PickType, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AnswerType, QuestionType, QuestionDifficulty } from '@prisma/client';
import { UpdateOrderModel } from 'order/order.dto';

class BaseQuestion {
  @ApiProperty({
    description: 'The unique identifier of the question',
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The title of the question',
    example: 'My title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the question',
    example: 'My perfect description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The type of answer for the question',
    example: AnswerType.FREE_ANSWER,
    enum: AnswerType,
  })
  @IsEnum(AnswerType)
  typeAnswer: AnswerType;

  @ApiProperty({
    description: 'The type of question',
    enum: QuestionType,
    example: QuestionType.AUDIO,
  })
  @IsEnum(QuestionType)
  typeQuestion: QuestionType;

  @ApiProperty({
    description: 'The unique identifier of the picture',
    required: false,
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
  })
  @IsUUID()
  @IsOptional()
  pictureId?: string;

  @ApiProperty({
    description: 'The difficulty level of the question',
    example: QuestionDifficulty.ADVANCED,
    required: false,
    enum: QuestionDifficulty,
  })
  @IsEnum(QuestionDifficulty)
  @IsOptional()
  difficulty?: QuestionDifficulty;

  @ApiProperty({ description: 'The order of the question', example: 'a0' })
  @IsString()
  order: string;

  @ApiProperty({
    description: 'The points for the question',
    required: false,
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  points?: number;

  @ApiProperty({
    description: 'The time allowed for the response to the question',
    required: false,
    example: 1,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  time?: number | null;

  @ApiProperty({
    description:
      'Define a bonus question that will not count in the user evaluation',
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  bonus?: boolean;
}

export class QuestionModel extends BaseQuestion {}

export class GetQuestionModel extends OmitType(BaseQuestion, ['id']) {
  @ApiProperty({
    description: 'The unique identifier of the trusted answer',
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  trust_answer_id?: string;
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
    nullable: true,
  })
  @IsOptional()
  before?: string | null;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  after?: string | null;
}

export class CreateQuestionModel extends OmitType(BaseQuestion, [
  'description',
  'id',
  'order',
]) {
  @ApiProperty({
    description: 'The unique identifier of the lesson',
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
  })
  @IsUUID()
  lessonId: string;

  @ApiProperty({
    description: 'The description of the question',
    example: 'My perfect example',
  })
  @IsString()
  description: string;

  @ApiProperty({ required: false, example: 'https://google.com/images' })
  @IsOptional()
  picture?: string;

  @ApiProperty({
    description: 'The unique identifier of the trusted answer',
    required: false,
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
  })
  @IsUUID()
  @IsOptional()
  trustAnswerId: string;
}

export class IdQuestionModel extends PickType(BaseQuestion, ['id']) {}

export class UpdateQuestionModel extends PartialType(BaseQuestion) {
  @ApiProperty({
    description: 'The unique identifier of the lesson',
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',

    required: false,
  })
  @IsOptional()
  @IsUUID()
  lessonId?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    example: 'https://google.com/images',
  })
  @IsOptional()
  picture?: string | null;

  @ApiProperty({
    description: 'The unique identifier of the trusted answer',
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  trustAnswerId?: string;
}

export class UpdateQuestionOrderModel extends UpdateOrderModel {}

export class QuestionIdResponse {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  id: string;
}

export class ValidateAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the question' })
  @IsUUID()
  questionId: string;

  @ApiProperty({
    description: 'The unique identifier of the answer',
    required: false,
  })
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
