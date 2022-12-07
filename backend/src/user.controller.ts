import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { UserModel } from './models/user';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async postHello(@Body() body: UserModel, @Headers() headers): Promise<UserModel> {
    const userdata = this.userService.postUser();
    return userdata;
  }
};
