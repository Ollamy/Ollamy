import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class LessonModel {
  @IsUUID()
  @IsOptional()
  Id: string;

  @IsUUID()
  @IsOptional()
  Chapter_id: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;

  @ApiProperty()
  @IsString()
  Data: string;
}
