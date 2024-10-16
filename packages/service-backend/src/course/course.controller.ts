import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CourseModel,
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
  CourseTrueResponse,
  CourseIdResponse,
  GetCourseRequest,
  UserCourseHp,
  Durationtype,
  ShareCourseCode,
  EnrollmentResponseTotal,
} from 'course/course.dto';
import { GetSectionsModel } from 'section/section.dto';
import { CourseService } from 'course/course.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { OllContext } from 'context/context.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Course')
@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOkResponse({
    description: 'course create response',
    type: CourseIdResponse,
  })
  @ApiBody({
    type: CreateCourseModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          title: 'Course Title',
          description: 'Course description',
          picture: 'Picture Data or Url',
        } as CreateCourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async postCourse(
    @Body() body: CreateCourseModel,
    @OllContext() ctx: any,
  ): Promise<CourseIdResponse> {
    return this.courseService.postCourse(body, ctx);
  }

  @ApiOkResponse({
    description: 'course delete response',
    type: CourseIdResponse,
  })
  @ApiBody({
    type: IdCourseModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          id: 'id',
        } as IdCourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteCourse(@Body() body: IdCourseModel): Promise<CourseIdResponse> {
    return this.courseService.deleteCourse(body);
  }

  @ApiOkResponse({
    description: 'User enrollments in courses',
    type: EnrollmentResponseTotal,
  })
  @ApiQuery({
    name: 'id',
    description: 'Id of the course (optional)',
    required: false,
  })
  @LoggedMiddleware(true)
  @Get('/enrollment')
  async getUserEnrollments(
    @Query('id') id: string,
    @OllContext() ctx: any,
  ): Promise<EnrollmentResponseTotal> {
    return this.courseService.getEnrollmentsForOwnerCourse(ctx.__user.id, id);
  }

  @ApiOkResponse({
    description: 'course content response',
    type: GetCourseRequest,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getCourse(
    @Param('id') id: string,
    @OllContext() ctx: any,
  ): Promise<CourseModel> {
    return this.courseService.getCourse(id, ctx);
  }

  @ApiOkResponse({
    description: 'course update response',
    type: CourseIdResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @ApiBody({
    type: UpdateCourseModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          ownerId: 'id',
          title: 'Course Title',
          description: 'Course description',
          picture: 'Picture Data or Url',
        } as UpdateCourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateCourse(
    @Param('id') id: string,
    @Body() body: UpdateCourseModel,
  ): Promise<CourseIdResponse> {
    return this.courseService.updateCourse(id, body);
  }

  @ApiOkResponse({
    description: "course's sections",
    type: [GetSectionsModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id/sections')
  async getCourseSections(
    @Param('id') id: string,
    @OllContext() ctx: any,
  ): Promise<GetSectionsModel[]> {
    return this.courseService.getCourseSections(id, ctx);
  }

  @ApiOkResponse({
    description: 'access code generated',
    type: ShareCourseCode,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @ApiQuery({
    name: 'duration',
    description: 'Duration of the code',
    required: false,
    enum: Durationtype,
  })
  @LoggedMiddleware(true)
  @Post('/:id/share')
  async generateCodeforCourse(
    @Param('id') id: string,
    @Query('duration') duration: Durationtype,
    @OllContext() ctx: any,
  ): Promise<ShareCourseCode> {
    return this.courseService.generateCodeforCourse(id, duration, ctx);
  }

  @ApiOkResponse({
    description: 'user added to course response',
    type: CourseTrueResponse,
  })
  @ApiQuery({
    name: 'id',
    description: 'Id of the course',
    required: false,
  })
  @ApiQuery({
    name: 'code',
    description: 'Code validity model',
    required: false,
  })
  @LoggedMiddleware(true)
  @Post('/join')
  async addUserToCourse(
    @Query('id') id: string,
    @Query('code') code: string,
    @OllContext() ctx: any,
  ): Promise<CourseTrueResponse> {
    return this.courseService.addUserToCourse(id, code, ctx.__user.id);
  }

  @ApiOkResponse({
    description: 'user added to course response',
    type: UserCourseHp,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id/user/hp')
  async getUserToCourseHp(
    @Param('id') id: string,
    @OllContext() ctx: any,
  ): Promise<UserCourseHp> {
    return this.courseService.getUserToCourseHp(id, ctx.__user.id);
  }
}
