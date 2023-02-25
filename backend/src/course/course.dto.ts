import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CourseModel {
  @ApiProperty()
  @IsUUID()
  Id: string;

  @ApiProperty()
  @IsUUID()
  OwnerId: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;
}

export class CreateCourseModel {
  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;
}

export class IdCourseModel {
  @ApiProperty()
  @IsUUID()
  Id: string;
}

export class UpdateCourseModel {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  OwnerId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Description: string;
}
