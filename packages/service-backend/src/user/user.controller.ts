import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import SessionService from 'redis/session/session.service';
import {
  UserModel,
  CreateUser,
  LoginUser,
  UpdateUser,
  UserCoursesResponse,
  UserIdResponse,
  UserTrueResponse,
  UserScore,
} from 'user/user.dto';
import { UserService } from 'user/user.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Response,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

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
    type: UserTrueResponse,
  })
  @ApiBody({
    type: CreateUser,
    description: 'user data model',
    examples: {
      template: {
        value: {
          firstname: 'name',
          lastname: 'lastname',
          email: 'test@test.test',
          password: '1234aaBB@',
        } as CreateUser,
      },
    },
  })
  @Post('/register')
  async registerUser(
    @Req() request,
    @Response() res,
    @Body() body: CreateUser,
  ) {
    const idx = request.rawHeaders.findIndex((e) => e === 'User-Agent');
    const cookiesParams =
      idx !== -1 && !!request.rawHeaders[idx + 1].match('Expo')
        ? { httpOnly: true, maxAge: SessionService.TTL }
        : {
            httpOnly: true,
            maxAge: SessionService.TTL,
            // sameSite: 'none' as const,
            // secure: true,
          };
    res.cookie(
      'session',
      await this.userService.registerUser(body),
      cookiesParams,
    );
    return res.send({ success: true });
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'true',
    type: UserTrueResponse,
  })
  @ApiBody({
    type: LoginUser,
    description: 'user data model',
    examples: {
      template: {
        value: {
          email: 'test@test.test',
          password: '1234aaBB@',
        } as LoginUser,
      },
    },
  })
  @Post('/login')
  async loginUser(
    @Req() request,
    @Response() res,
    @Body() body: LoginUser,
  ): Promise<any> {
    const idx = request.rawHeaders.findIndex((e) => e === 'User-Agent');
    const cookiesParams =
      idx !== -1 && !!request.rawHeaders[idx + 1].match('Expo')
        ? { httpOnly: true, maxAge: SessionService.TTL }
        : {
            httpOnly: true,
            maxAge: SessionService.TTL,
            // sameSite: 'none' as const,
            // secure: true,
          };
    res.cookie(
      'session',
      await this.userService.loginUser(body),
      cookiesParams,
    );
    return res.send({ success: true });
  }

  @ApiOkResponse({
    description: "user's data",
    type: UserModel,
  })
  @LoggedMiddleware(true)
  @Get()
  async getUser(@OllContext() ctx: any): Promise<UserModel> {
    return this.userService.getUser(ctx);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: "user's token",
    type: String,
  })
  @ApiBody({
    type: UpdateUser,
    description: 'user data model',
    examples: {
      template: {
        value: {
          firstname: 'name',
          lastname: 'lastname',
          email: 'test@test.test',
          password: '1234',
        } as UpdateUser,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put()
  async updateUser(
    @Req() request,
    @Response() res,
    @Body() body: UpdateUser,
    @OllContext() ctx: any,
  ) {
    const idx = request.rawHeaders.findIndex((e) => e === 'User-Agent');
    const cookiesParams =
      idx !== -1 && !!request.rawHeaders[idx + 1].match('Expo')
        ? { httpOnly: true, maxAge: SessionService.TTL }
        : {
            httpOnly: true,
            maxAge: SessionService.TTL,
            sameSite: 'none' as const,
            secure: true,
          };
    res.cookie(
      'session',
      this.userService.updateUser(body, ctx),
      cookiesParams,
    );

    return res.send({ success: true });
  }

  @ApiOkResponse({
    description: 'Ok.',
    type: UserIdResponse,
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteUser(@OllContext() ctx: any): Promise<UserIdResponse> {
    return this.userService.deleteUser(ctx);
  }

  @ApiOkResponse({
    description: 'list the courses of a user',
    type: UserCoursesResponse,
  })
  @LoggedMiddleware(true)
  @Get('/courses')
  async getUserCourses(@OllContext() ctx: any): Promise<UserCoursesResponse> {
    return this.userService.getUserCourses(ctx);
  }

  @ApiOkResponse({
    description: "user's score",
    type: UserModel,
  })
  @LoggedMiddleware(true)
  @Get('/score')
  async getUserScore(@OllContext() ctx: any): Promise<UserScore> {
    return this.userService.getUserScore(ctx);
  }
}
