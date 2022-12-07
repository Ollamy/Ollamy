import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/test')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(): string {
    return this.appService.getHello();
  }
}
