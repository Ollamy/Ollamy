import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  Id: string;
  @ApiProperty()
  Firstname: string;
  @ApiProperty()
  Lastname: string;
  @ApiProperty()
  Email: string;
  @ApiProperty()
  Password: string;
  Communities_id: string[];
}
