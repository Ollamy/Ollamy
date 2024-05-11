import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FileAi {
  @ApiProperty()
  @IsString()
  data: string;

  @ApiProperty()
  @IsString()
  mimeType: string;
}

export class Answer {
  @IsString()
  answer: string;

  @IsBoolean()
  correct: boolean;
}

export class Question {
  @IsString()
  question: string;

  @Type(() => Answer)
  @ValidateNested({ each: true })
  @IsArray()
  answers: Answer[];
}

export class QuestionResponse {
  @Type(() => Question)
  @ValidateNested({ each: true })
  @IsArray()
  root: Question[];
}