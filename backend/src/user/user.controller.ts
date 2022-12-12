import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { UserModel, RegisterUserModel, LoginUserModel } from 'user/user.dto';
import { UserService } from 'user/user.service';

@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
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
  async registerUser(@Body() body: RegisterUserModel): Promise<string> {
    const token = this.userService.registerUser(body);
    return token;
  }

  @ApiOkResponse({
    description: "user's token",
    type: String,
  })
  @ApiBody({
    type: LoginUserModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Email: 'test@test.test',
          Password: '1234',
        } as LoginUserModel,
      },
    },
  })
  @Post('/login')
  async loginUser(@Body() body: LoginUserModel): Promise<string> {
    const token = this.userService.loginUser(body);
    return token;
  }

  @ApiOkResponse({
    description: "user's token",
    type: String,
  })
  @ApiBody({
    type: LoginUserModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Email: 'test@test.test',
          Password: '1234',
        } as LoginUserModel,
      },
    },
  })
  @ApiHeader({
    name: 'Authentification token',
    description: 'token'
  })
  @Post('/update')
  async updateUser(@Body() body: LoginUserModel): Promise<string> {
    const token = this.userService.loginUser(body);
    return token;
  }
}
