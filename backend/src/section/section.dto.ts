import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SectionModel {
  @IsUUID()
  @IsOptional()
  Id: string;

  @IsUUID()
  @IsOptional()
  CourseId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;
}


export class IdSectionModel {
  @ApiProperty()
  @IsUUID()
  Id: string;
}

export class UpdateSectionModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  CourseId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Description: string;
}