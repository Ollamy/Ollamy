import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseSectionModel {
  @ApiProperty({ description: 'The unique identifier of the section' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The title of the section' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the section' })
  @IsString()
  description: string;
}

export class SectionModel extends BaseSectionModel {
  @ApiProperty({ description: 'The unique identifier of the course associated with the section' })
  @IsUUID()
  courseId: string;
}

export class CreateSectionModel {
  @ApiProperty({ description: 'The unique identifier of the course to which the section belongs' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ description: 'The title of the section' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the section' })
  @IsString()
  description: string;
}

export class IdSectionModel {
  @ApiProperty({ description: 'The unique identifier of the section' })
  @IsUUID()
  id: string;
}

export class UpdateSectionModel {
  @ApiProperty({ description: 'The unique identifier of the course to which the section belongs', required: false })
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @ApiProperty({ description: 'The title of the section', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the section', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class SectionIdResponse {
  @ApiProperty({ description: 'The unique identifier of the section' })
  @IsUUID()
  id: string;
}
