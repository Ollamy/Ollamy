import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ChapterModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  sectionId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class CreateChapterModel {
  @ApiProperty()
  @IsUUID()
  sectionId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class IdChapterModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateChapterModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  sectionId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
