import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

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

export class GetSectionModel extends SectionModel {
  @ApiProperty({ required: false, enum: Status })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

export class GetSectionsModel extends CourseSectionModel {
  @ApiProperty({ required: false, enum: Status })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
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
