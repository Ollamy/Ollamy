import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CourseModel } from 'course/course.dto';
import { CourseService } from 'course/course.service';

@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOkResponse({
    description: "course create response",
    type: String,
  })
  @ApiBody({
    type: CourseModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Owner_id: '7d95d801-b748-40b4-995d-b8d79e0c1a0f',
          Title: "Course Title",
          Description: "Course decsription",
        } as CourseModel,
      },
    },
  })
  @Post()
  async registerCourse(@Body() body: CourseModel): Promise<string> {
    return this.courseService.postCourse(body);
  }
}
