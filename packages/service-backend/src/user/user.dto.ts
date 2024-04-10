import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, IsBoolean, IsUrl, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Pick } from '@prisma/client/runtime/library';

abstract class BaseUser {
  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UserModel extends BaseUser {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password: string;
}

export class CreateUser extends BaseUser {
  @ApiProperty({
    description: 'Password must contain at least 8 characters, 2 numbers, and 2 uppercase letters',
    minLength: 8,
    maxLength: 50,
    pattern: '^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$'
  })
  @IsString()
  password: string;
}

export class LoginUser extends BaseUser {
  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password: string;
}

export class UpdateUser extends BaseUser {
  @ApiProperty({ description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  password?: string;
}

export class UserScore {
  @ApiProperty({ description: 'User id' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: 'User\'s score' })
  @IsString()
  score: number;
}

export class UserIdResponse {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @IsUUID()
  id: string;
}

export class UserTrueResponse {
  @ApiProperty({ description: 'Indicates if the operation was successful or not' })
  @IsBoolean()
  success: boolean;
}

export class UserCourse {
  @ApiProperty({ description: 'The unique identifier of the course' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The title of the course' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The URL of the picture representing the course' })
  @IsUrl()
  picture: string;

  @ApiProperty({ description: 'Indicates if the user owns this course' })
  @IsBoolean()
  owner: boolean;

  @ApiProperty({ description: 'The unique identifier of the last lesson' })
  @IsString()
  last_lesson_id: string;

  @ApiProperty({ description: 'The unique identifier of the last section' })
  @IsString()
  last_section_id: string;
}

export class UserCoursesResponse {
  @ApiProperty({ description: 'List of courses associated with the user' })
  @ValidateNested({ each: true })
  @Type(() => UserCourse)
  courses: UserCourse[];
}
