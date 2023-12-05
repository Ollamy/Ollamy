import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AnswerModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  questionId: string;

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
  questionId: string;

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
  questionId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;
}
