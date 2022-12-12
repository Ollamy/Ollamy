import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChapterModel {
  @IsUUID()
  @IsOptional()
  Id: string;

//   @ApiProperty()
//   @IsString()
//   Chapters: chapter;

  // @IsUUID()
  // @IsOptional()
  // Community_id: string;

//   @ApiProperty()
//   @IsString()
//   Chapters: chapter;

  @IsUUID()
  @IsOptional()
  Section_id: string;
}
