import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserModel {
  @IsUUID()
  @IsOptional()
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

  Communities_id: string[];
}
