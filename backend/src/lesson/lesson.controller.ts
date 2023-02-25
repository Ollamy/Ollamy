import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateLessonModel,
  IdLessonModel,
  LessonModel,
} from 'lesson/lesson.dto';
import { LessonService } from 'lesson/lesson.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { QuestionModel } from 'question/question.dto';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Lesson')
@Controller('/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOkResponse({
    description: 'lesson create response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: CreateLessonModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          ChapterId: 'Chapter Id',
          Title: 'Lesson Title',
          Description: 'Lesson decsription',
        } as CreateLessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerLesson(@Body() body: CreateLessonModel): Promise<string> {
    return this.lessonService.postLesson(body);
  }

  @ApiOkResponse({
    description: 'lesson delete response',
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
  async deleteLesson(@Body() body: IdLessonModel): Promise<string> {
    return this.lessonService.deleteLesson(body);
  }

  @ApiOkResponse({
    description: 'lesson content response',
    type: LessonModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getLesson(@Param('id') id: string): Promise<LessonModel> {
    return this.lessonService.getLesson(id);
  }

  @ApiOkResponse({
    description: 'lesson update response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true,
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
          Title: 'Lesson Title',
          Description: 'Lesson decsription',
        } as LessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateLesson(
    @Param('id') id: string,
    @Body() body: LessonModel,
  ): Promise<string> {
    return this.lessonService.updateLesson(id, body);
  }

  @ApiOkResponse({
    description: "lesson's questions",
    type: [QuestionModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/questions/:id')
  async getLessonQuestions(@Param('id') id: string): Promise<QuestionModel[]> {
    return this.lessonService.getLessonQuestions(id);
  }
}
