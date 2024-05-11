import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';



export class QuestionAnswerModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsNumber()
  order: number;
}

export class AnswerModel {
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

  @ApiProperty()
  @IsNumber()
  order: number;
}

export class CreateAnswerModel {
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

export class AnswerIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateAnswerOrderModel {
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

  @ApiProperty({ description: 'The origin of the answer' })
  @IsUUID()
  origin: string;
}
