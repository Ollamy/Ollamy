import { Controller, Post, Body, Headers, Put, Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import {
  RegisterUserModel,
  LoginUserModel,
  UpdateUserModel,
} from 'user/user.dto';
import { UserService } from 'user/user.service';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiForbiddenResponse({
  description: 'User does not have permission to execute this action',
})
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
  @Post('/register')
  async registerUser(@Body() body: RegisterUserModel): Promise<string> {
    return this.userService.registerUser(body);
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
    return this.userService.loginUser(body);
  }

  @ApiOkResponse({
    description: "user's token",
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: LoginUserModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Firstname: 'name',
          Lastname: 'lastname',
          Email: 'test@test.test',
          Password: '1234',
        } as UpdateUserModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put()
  async updateUser(
    @Body() body: UpdateUserModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.userService.updateUser(body, token);
  }

  @ApiOkResponse({
    description: 'Ok.',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteUser(
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.userService.deleteUser(token);
  }
}
