import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ChapterModel {
  @ApiProperty()
  @IsUUID()
  Id: string;

  @ApiProperty()
  @IsUUID()
  SectionId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;
}

export class CreateChapterModel {

  @ApiProperty()
  @IsUUID()
  SectionId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;
}

export class IdChapterModel {
  @ApiProperty()
  @IsUUID()
  Id: string;
}

export class UpdateChapterModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  SectionId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Description: string;
}
