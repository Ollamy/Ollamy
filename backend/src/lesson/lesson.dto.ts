import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class LessonModel {
  @IsUUID()
  @IsOptional()
  Id: string;

  @IsUUID()
  @IsOptional()
  ChapterId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;
}

export class IdLessonModel {
  @ApiProperty()
  @IsUUID()
  Id: string;
}

export class UpdateLessonModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  ChapterId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Description: string;
}
