import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserModel {
  @ApiProperty()
  @IsUUID()
  Id: string;

  @ApiProperty()
  @IsString()
  Firstname: string;

  @ApiProperty()
  @IsString()
  Lastname: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;
}

export class CreateUserModel {
  @ApiProperty()
  @IsString()
  Firstname: string;

  @ApiProperty()
  @IsString()
  Lastname: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;
}

export class JwtUserModel {
  @IsUUID()
  Id: string;

  @IsString()
  Firstname: string;

  @IsString()
  Lastname: string;

  @IsEmail()
  Email: string;

  @IsString()
  Password: string;
}

export class LoginUserModel {
  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;
}

export class UpdateUserModel {
  @IsUUID()
  @IsOptional()
  Id: string;

  @ApiProperty()
  @IsOptional()
  Firstname: string;

  @ApiProperty()
  @IsOptional()
  Lastname: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Password: string;
}
