import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class BaseAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the answer' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The data of the answer', required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ description: 'The picture of the answer', required: false })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty({ description: 'The order of the answer' })
  @IsString()
  order: string;
}

export class AnswerModel extends BaseAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the question associated with the answer' })
  @IsUUID()
  questionId: string;
}

export class CreateAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the question associated with the answer' })
  @IsUUID()
  questionId: string;

  @ApiProperty({ description: 'The data of the answer', required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ description: 'The picture of the answer', required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class IdAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the answer' })
  @IsUUID()
  id: string;
}

export class UpdateAnswerModel extends BaseAnswerModel {
  @ApiProperty({ description: 'The unique identifier of the question associated with the answer', required: false })
  @IsUUID()
  @IsOptional()
  questionId?: string;
}

export class AnswerIdResponse {
  @ApiProperty({ description: 'The unique identifier of the answer' })
  @IsUUID()
  id: string;
}

export class UpdateAnswerOrderModel {
  @ApiProperty({ description: 'The order after the current order', required: false })
  @IsString()
  @IsOptional()
  after?: string | null;

  @ApiProperty({ description: 'The order before the current order', required: false })
  @IsString()
  @IsOptional()
  before?: string | null;

  @ApiProperty({ description: 'The origin of the answer' })
  @IsUUID()
  origin: string;
}
