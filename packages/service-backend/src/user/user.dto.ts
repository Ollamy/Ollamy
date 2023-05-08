import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
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
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}

export class LoginUserModel {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}

export class UpdateUserModel {
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsOptional()
  firstname: string;

  @ApiProperty()
  @IsOptional()
  lastname: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
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
