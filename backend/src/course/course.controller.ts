import {
  Controller,
  Post,
  Body,
  Headers,
  Delete,
  Get,
  Put,
  Param,
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
  IdCourseModel,
  UpdateCourseModel,
} from 'course/course.dto';
import { SectionModel } from 'section/section.dto';
import { CourseService } from 'course/course.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Course')
@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOkResponse({
    description: 'course create response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: CourseModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Title: 'Course Title',
          Description: 'Course description',
        } as CourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerCourse(
    @Body() body: CourseModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.courseService.postCourse(body, token);
  }

  @ApiOkResponse({
    description: 'course delete response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: IdCourseModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Id: 'id',
        } as IdCourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteCourse(
    @Body() body: IdCourseModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.courseService.deleteCourse(body, token);
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
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getCourse(
    @Param('id') id: string,
    @Headers('Authorization_token') token: string,
  ): Promise<CourseModel> {
    return this.courseService.getCourse(id, token);
  }

  @ApiOkResponse({
    description: 'course update response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the course',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: UpdateCourseModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          OwnerId: 'id',
          Title: 'Course Title',
          Description: 'Course description',
        } as UpdateCourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateCourse(
    @Param('id') id: string,
    @Body() body: UpdateCourseModel,
  ): Promise<string> {
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
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/sections/:id')
  async getCourseSections(@Param('id') id: string): Promise<SectionModel[]> {
    return this.courseService.getCourseSections(id);
  }
}
