import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSessionModel {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsOptional()
  currentQuestionId: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsOptional()
  sessionId: string;
}

export class GetSessionModel {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsOptional()
  currentQuestionId: string;

  @ApiProperty({ required: true })
  @IsNumber()
  correctAnswers: number;

  @ApiProperty({ required: true })
  @IsNumber()
  totalQuestions: number;
}

class AnswerModel {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  data?: string;
}

export class ValidateQuestionSessionModel {
  @ApiProperty({ required: true })
  @IsUUID()
  questionId: string;

  @ApiProperty({ required: true, type: AnswerModel })
  answer: AnswerModel;
}

export class ValidateQuestionSessionResponseModel {
  @ApiProperty({ required: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ required: true, nullable: true })
  @IsUUID()
  @IsOptional()
  nextQuestionId?: string | null;

  @ApiProperty({ required: true })
  @IsUUID()
  answerId: string;

  @ApiProperty({ required: true })
  @IsNumber()
  hp: number;
}
