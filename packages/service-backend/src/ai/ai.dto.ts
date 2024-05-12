import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FileAi {
  @ApiProperty({ description: 'The data of the file' })
  @IsString()
  data: string;

  @ApiProperty({ description: 'The MIME type of the file' })
  @IsString()
  mimeType: string;
}

export class BaseAnswer {
  @ApiProperty({ description: 'The answer text' })
  @IsString()
  answer: string;

  @ApiProperty({ description: 'Indicates if the answer is correct or not' })
  @IsBoolean()
  correct: boolean;
}

export class Answer extends BaseAnswer {}

export class BaseQuestion {
  @ApiProperty({ description: 'The question text' })
  @IsString()
  question: string;

  @ApiProperty({ description: 'List of answers associated with the question' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseAnswer)
  answers: BaseAnswer[];
}

export class Question extends BaseQuestion {}

export class BaseQuestionResponse {
  @ApiProperty({ description: 'List of questions and their answers' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseQuestion)
  root: BaseQuestion[];
}

export class QuestionResponse extends BaseQuestionResponse {}
