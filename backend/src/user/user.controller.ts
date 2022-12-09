import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserModel, RegisterUserModel } from 'user/user.dto';
import { UserService } from 'user/user.service';

@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: "user's token",
    type: String,
  })
  @ApiBody({
    type: RegisterUserModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          Firstname: 'name',
          Lastname: 'lastname',
          Email: 'test@test.test',
          Password: '1234',
        } as RegisterUserModel,
      },
    },
  })
  @Post()
  async registerUser(@Body() body: RegisterUserModel): Promise<string> {
    const token = this.userService.registerUser(body);
    return token;
  }
}
