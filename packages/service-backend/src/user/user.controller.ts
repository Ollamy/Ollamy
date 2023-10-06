import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Get,
  Response,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import {
  CreateUserModel,
  GetUserModel,
  LoginUserModel,
  UpdateUserModel,
} from 'user/user.dto';
import { UserService } from 'user/user.service';
import SessionService from 'redis/session/session.service';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('User')
@ApiForbiddenResponse({
  description: 'User does not have permission to execute this action',
})
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCookieAuth()
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
          password: '1234aaBB@',
        } as CreateUserModel,
      },
    },
  })
  @Post('/register')
  async registerUser(@Response() res, @Body() body: CreateUserModel) {
    res.cookie('session', await this.userService.registerUser(body), {
      httpOnly: true,
      maxAge: SessionService.TTL,
    });

    return res.send({ success: true });
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'true',
    type: String,
  })
  @ApiBody({
    type: LoginUserModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          email: 'test@test.test',
          password: '1234aaBB@',
        } as LoginUserModel,
      },
    },
  })
  @Post('/login')
  async loginUser(@Response() res, @Body() body: LoginUserModel): Promise<any> {
    res.cookie('session', await this.userService.loginUser(body), {
      httpOnly: true,
      maxAge: SessionService.TTL,
    });
    return res.send({ success: true });
  }

  @ApiOkResponse({
    description: "user's data",
    type: GetUserModel,
  })
  @LoggedMiddleware(true)
  @Get()
  async getUser(@OllContext() ctx: any): Promise<GetUserModel> {
    return this.userService.getUser(ctx);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: "user's token",
    type: String,
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
    @Response() res,
    @Body() body: UpdateUserModel,
    @OllContext() ctx: any,
  ) {
    res.cookie('session', this.userService.updateUser(body, ctx), {
      httpOnly: true,
      maxAge: SessionService.TTL,
    });

    return res.send({ success: true });
  }

  @ApiOkResponse({
    description: 'Ok.',
    type: String,
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteUser(@OllContext() ctx: any): Promise<string> {
    return this.userService.deleteUser(ctx);
  }
}
