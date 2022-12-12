import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserModel {
  @IsUUID()
  @IsOptional()
  Id: string;

  @ApiProperty()
  Firstname: string;

  @ApiProperty()
  Lastname: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;

  Communities_id: string[];
}

export class JwtUserModel {
  @IsUUID()
  Id: string;

  @ApiProperty()
  Firstname: string;

  @ApiProperty()
  Lastname: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Password: string;
}

export class RegisterUserModel {
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
