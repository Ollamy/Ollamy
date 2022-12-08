import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserModel } from 'user/user.dto';
import { UserService } from 'user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: UserModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Firstname: 'name',
          Lastname: 'lastname',
          Email: 'test@test.test',
          Password: '1234',
        } as UserModel,
      },
    },
  })
  @Post()
  async registerUser(@Body() body: UserModel): Promise<string> {
    const token = this.userService.postUser(body);
    return token;
  }
}
