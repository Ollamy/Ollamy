import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateOrderModel {
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

  @ApiProperty({ description: `Object's id` })
  @IsUUID()
  origin: string;
}
