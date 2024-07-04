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
  @ApiProperty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsBoolean()
  correct: boolean;
}

export class Question {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({type: [Answer]})
  @Type(() => Answer)
  @ValidateNested({ each: true })
  @IsArray()
  answers: Answer[];
}

