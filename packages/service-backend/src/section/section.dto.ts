import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CourseSectionModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class SectionModel {
  @ApiProperty()
  @IsUUID()
  courseId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class CreateSectionModel {
  @ApiProperty()
  @IsUUID()
  courseId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class IdSectionModel {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateSectionModel {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class SectionIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}
