import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LessonModel } from 'lesson/lesson.dto';
import { LessonService } from 'lesson/lesson.service';

@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOkResponse({
    description: "lesson create response",
    type: String,
  })
  @ApiBody({
    type: LessonModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Chapter_id: '7d95d801-b748-40b4-995d-b8d79e0c1a0f',
          Title: "Lesson Title",
          Description: "Lesson decsription",
          Data: "Lesson Data"
        } as LessonModel,
      },
    },
  })
  @Post()
  async registerLesson(@Body() body: LessonModel): Promise<string> {
    return this.lessonService.postLesson(body);
  }
}
