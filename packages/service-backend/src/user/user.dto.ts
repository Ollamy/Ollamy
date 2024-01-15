import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class UserModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserModel {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Password must contain at least 8 characters, 2 numbers and 2 uppercase letters',
  })
  @IsString()
  password: string;
}

export class LoginUserModel {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserModel {
  @ApiProperty()
  @IsOptional()
  firstname?: string;

  @ApiProperty()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}

export class GetUserModel {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UserIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UserTrueResponse {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}


export class UserCourses {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsUUID()
  picture_id: string

  @ApiProperty()
  owner: boolean
}

export class UserCoursesResponse {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserCourses)
  courses: UserCourses[]
}