import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import {
  CreateUserModel,
  GetUserModel,
  LoginUserModel,
  UpdateUserModel,
  UserModel,
} from 'user/user.dto';
import { UserService } from 'user/user.service';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('User')
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
    type: CreateUserModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          firstname: 'name',
          lastname: 'lastname',
          email: 'test@test.test',
          password: '1234aaBB',
        } as CreateUserModel,
      },
    },
  })
  @Post('/register')
  async registerUser(@Body() body: CreateUserModel): Promise<string> {
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
      template: {
        value: {
          email: 'test@test.test',
          password: '1234aaBB',
        } as LoginUserModel,
      },
    },
  })
  @Post('/login')
  async loginUser(@Body() body: LoginUserModel): Promise<string> {
    return this.userService.loginUser(body);
  }

  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiOkResponse({
    description: "user's data",
    type: GetUserModel,
  })
  @LoggedMiddleware(true)
  @Get()
  async getUser(@OllContext() ctx: any,): Promise<GetUserModel> {
    return this.userService.getUser(ctx);
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
    type: UpdateUserModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          firstname: 'name',
          lastname: 'lastname',
          email: 'test@test.test',
          password: '1234',
        } as UpdateUserModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put()
  async updateUser(
    @Body() body: UpdateUserModel,
    @OllContext() ctx: any,
  ): Promise<string> {
    return this.userService.updateUser(body, ctx);
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
  async deleteUser(@OllContext() ctx: any): Promise<string> {
    return this.userService.deleteUser(ctx);
  }
}
