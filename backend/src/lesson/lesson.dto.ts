import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class LessonModel {
  @IsUUID()
  @IsOptional()
  Id: string;

//   @ApiProperty()
//   @IsString()
//   Chapters: chapter;

  @IsUUID()
  @IsOptional()
  Chapter_id: string;
}
