import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AnswerModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  question_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;
}

export class CreateAnswerModel {
  @ApiProperty()
  @IsUUID()
  question_id: string;

  @ApiProperty()
  @IsString()
  data: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;
}

export class IdAnswerModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateAnswerModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  question_id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;
}

export class AnswerIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}