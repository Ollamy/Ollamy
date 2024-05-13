import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class QuestionAnswerModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsString()
  order: string;
}

export class AnswerModel {
  @ApiProperty()
  @IsUUID()
  questionId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsString()
  order: string;
}

export class CreateAnswerModel {
  @ApiProperty()
  @IsUUID()
  questionId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ required: false })
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
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  questionId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ required: false, nullable: true, })
  @IsString()
  @IsOptional()
  picture?: string | null;
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
    nullable: true,
  })
  @IsString()
  @IsOptional()
  after?: string | null;

  @ApiProperty({
    description: 'The order before the current order',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  before?: string | null;

  @ApiProperty({ description: 'The origin of the answer' })
  @IsUUID()
  origin: string;
}
