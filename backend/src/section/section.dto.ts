import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class SectionModel {
  @IsUUID()
  @IsOptional()
  Id: string;

  @IsUUID()
  @IsOptional()
  Course_id: string;
}
