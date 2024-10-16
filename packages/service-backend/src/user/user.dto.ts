import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Type, Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
} from 'class-validator';

export enum PlatformEnum {
  MOBILE = 'MOBILE',
  MAKER = 'MAKER',
}

export class SuccessBody {
  @ApiProperty({ description: 'Result of the request' })
  @IsBoolean()
  success: boolean;
}

abstract class BaseUser {
  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string;
}

export class UserModel extends BaseUser {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  // @MinLength(8)
  // @MaxLength(50)
  // @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/, {
  //   message:
  //     'Password must contain at least 8 characters, 2 numbers, and 2 uppercase letters',
  // })
  password: string;
}

export class CreateUserModel extends BaseUser {
  @ApiProperty({
    description:
      'Password must contain at least 8 characters, 2 numbers and 2 uppercase letters',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Platform user tries to access',
    required: true,
    enum: PlatformEnum,
  })
  @IsEnum(PlatformEnum)
  platform: PlatformEnum;
}

export class LoginUserModel {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Platform user tries to login',
    required: true,
    enum: PlatformEnum,
  })
  @IsEnum(PlatformEnum)
  platform: PlatformEnum;
}

export class UpdateUserModel {
  @ApiProperty({ description: 'The first name of the user', required: false })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty({ description: 'The last name of the user', required: false })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({
    description: 'The email address of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  // @MinLength(8)
  // @MaxLength(50)
  // @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/, {
  //   message:
  //     'Password must contain at least 8 characters, 2 numbers, and 2 uppercase letters',
  // })
  password?: string;
}

export class GetUserModel extends BaseUser {}

export class GetUserScoreModel {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'The score of the user' })
  @IsNumber()
  score: number;
}

export class UserIdResponse {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @IsUUID()
  id: string;
}

export class UserTrueResponse {
  @ApiProperty({
    description: 'Indicates if the operation was successful or not',
  })
  @IsBoolean()
  success: boolean;
}

export class UserCourses {
  @ApiProperty({ description: 'The unique identifier of the course' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The title of the course' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The URL of the picture representing the course',
  })
  @IsUUID()
  pictureId: string;

  @ApiProperty({ description: 'Indicates if the user owns this course' })
  @IsBoolean()
  owner: boolean;

  @ApiProperty({
    description: 'The number of users enrolled in the course',
    required: false,
  })
  @IsNumber()
  numberOfUsers?: number;

  @ApiProperty({
    required: false,
    enum: Status,
    description: 'course completion status',
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

export class UserCoursesResponse {
  @ApiProperty({
    description: 'List of courses associated with the user',
    type: [UserCourses],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserCourses)
  courses: UserCourses[];
}
