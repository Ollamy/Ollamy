import { Controller, Post, Req } from '@nestjs/common';
import { UserModel } from 'user/user.dto';
import { UserService } from 'user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Req() req: Request): Promise<string> {
    const userData: UserModel = JSON.parse(req.body.toString());
    const token = this.userService.postUser(userData);
    return token;
  }
}
