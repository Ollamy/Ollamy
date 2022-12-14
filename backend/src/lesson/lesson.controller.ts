import { Controller, Post, Body, Headers, Put, Delete, Query, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiHeader, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { IdLessonModel, LessonModel } from 'lesson/lesson.dto';
import { LessonService } from 'lesson/lesson.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';


@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOkResponse({
    description: "lesson create response",
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: LessonModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          ChapterId: "Chapter Id",
          Title: "Lesson Title",
          Description: "Lesson decsription"
        } as LessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerLesson(@Body() body: LessonModel, @Headers('Authorization_token') token: string): Promise<string> {
    return this.lessonService.postLesson(body, token);
  }

  @ApiOkResponse({
    description: "lesson delete response",
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: IdLessonModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Id: 'id',
        } as IdLessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteLesson(@Body() body: IdLessonModel, @Headers('Authorization_token') token: string): Promise<string> {
    return this.lessonService.deleteLesson(body, token);
  }

  @ApiOkResponse({
    description: "lesson content response",
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getLesson(@Query('id') id: string, @Headers('Authorization_token') token: string): Promise<string> {
    return this.lessonService.getLesson(id, token);
  }

  @ApiOkResponse({
    description: "lesson update response",
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: LessonModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          ChapterId: 'id',
          Title: "Lesson Title",
          Description: "Lesson decsription"
        } as LessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put("/:id")
  async updateLesson(@Query('id') id: string, @Body() body: LessonModel): Promise<string> {
    return this.lessonService.updateLesson(id, body);
  }
}
