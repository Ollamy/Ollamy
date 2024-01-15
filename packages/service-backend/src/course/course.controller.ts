import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Put,
  Param,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CourseModel,
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
  CourseTrueResponse,
  CourseIdResponse,
} from 'course/course.dto';
import { SectionModel } from 'section/section.dto';
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
    description: "get courses owned by user",
    type: [CourseModel],
  })
  @LoggedMiddleware(true)
  @Get('/owned')
  async getCoursesOwnedByUser(@OllContext() ctx: any): Promise<CourseModel[]> {
    return this.courseService.getCoursesOwnedByUser(ctx);
  }

  @ApiOkResponse({
    description: "get courses subscribed by user",
    type: [CourseModel],
  })
  @LoggedMiddleware(true)
  @Get('/subscribed')
  async getCoursesSubscribedByUser(@OllContext() ctx: any): Promise<CourseModel[]> {
    return this.courseService.getCoursesSubscribedByUser(ctx);
  }

  @ApiOkResponse({
    description: 'course content response',
    type: CourseModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getCourse(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.getCourse(id);
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
    type: [SectionModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/sections/:id')
  async getCourseSections(@Param('id') id: string): Promise<SectionModel[]> {
    return this.courseService.getCourseSections(id);
  }

  @ApiOkResponse({
    description: 'user added to course response',
    type: CourseTrueResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @LoggedMiddleware(true)
  @Post('/user/:id')
  async addUserToCourse(
    @Param('id') id: string,
    @OllContext() ctx: any,
  ): Promise<CourseTrueResponse> {
    return this.courseService.addUserToCourse(id, ctx.__user.id);
  }
}
