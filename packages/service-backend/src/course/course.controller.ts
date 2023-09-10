import {
  Controller,
  Post,
  Body,
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
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
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
    type: String,
  })
  @ApiBody({
    type: CreateCourseModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          title: 'Course Title',
          description: 'Course description',
        } as CreateCourseModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async postCourse(
    @Body() body: CreateCourseModel,
    @OllContext() ctx: any,
  ): Promise<string> {
    return this.courseService.postCourse(body, ctx);
  }

  @ApiOkResponse({
    description: 'course delete response',
    type: String,
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
  async deleteCourse(@Body() body: IdCourseModel): Promise<string> {
    return this.courseService.deleteCourse(body);
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
    type: String,
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
  @LoggedMiddleware(true)
  @Get('/sections/:id')
  async getCourseSections(@Param('id') id: string): Promise<SectionModel[]> {
    return this.courseService.getCourseSections(id);
  }
}
