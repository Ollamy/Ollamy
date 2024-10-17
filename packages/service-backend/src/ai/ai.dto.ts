import { IsString, IsBoolean, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AnswerType } from '@prisma/client';

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
  @ApiProperty({enum: AnswerType})
  @IsEnum(AnswerType)
  type: AnswerType;

  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({type: [Answer]})
  @Type(() => Answer)
  @ValidateNested({ each: true })
  @IsArray()
  answers: Answer[];
}

export enum AllowedMimeType {
  PDF = 'application/pdf',
  MP3 = 'audio/mpeg',
  WAV = 'audio/wav',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  TXT = 'text/plain',
  MOV = 'video/mov',
  MPEG = 'video/mpeg',
  MP4 = 'video/mp4',
  MPG = 'video/mpg',
  AVI = 'video/avi',
  WMV = 'video/wmv',
  MPEGPS = 'video/mpegps',
  FLV = 'video/flv',
}
