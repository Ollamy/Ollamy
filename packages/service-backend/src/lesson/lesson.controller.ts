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
  JoinLessonModel,
  LessonModel,
  LessonIdResponse,
} from 'lesson/lesson.dto';
import { LessonService } from 'lesson/lesson.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { LectureModel, QuestionModel } from 'question/question.dto';
import { OllContext } from 'context/context.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Lesson')
@Controller('/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOkResponse({
    description: 'lesson create response',
    type: LessonIdResponse,
  })
  @ApiBody({
    type: CreateLessonModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          section_id: 'Section Id',
          title: 'Lesson Title',
          description: 'Lesson decsription',
        } as CreateLessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerLesson(
    @Body() body: CreateLessonModel,
    @OllContext() ctx: any,
  ): Promise<LessonIdResponse> {
    return this.lessonService.postLesson(body, ctx);
  }

  @ApiOkResponse({
    description: 'lesson delete response',
    type: LessonIdResponse,
  })
  @ApiBody({
    type: IdLessonModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          id: 'id',
        } as IdLessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteLesson(@Body() body: IdLessonModel): Promise<LessonIdResponse> {
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
  @LoggedMiddleware(true)
  @Get('/:id')
  async getLesson(@Param('id') id: string): Promise<LessonModel> {
    return this.lessonService.getLesson(id);
  }

  @ApiOkResponse({
    description: 'lesson update response',
    type: LessonIdResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true,
  })
  @ApiBody({
    type: LessonModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          sectionId: 'id',
          title: 'Lesson Title',
          description: 'Lesson decsription',
        } as LessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateLesson(
    @Param('id') id: string,
    @Body() body: LessonModel,
  ): Promise<LessonIdResponse> {
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
  @LoggedMiddleware(true)
  @Get('/questions/:id')
  async getLessonQuestions(@Param('id') id: string): Promise<QuestionModel[]> {
    return this.lessonService.getLessonQuestions(id);
  }

  @ApiOkResponse({
    description: "lesson's lecture",
    type: [QuestionModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the lesson',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/lecture/:id')
  async getLessonLecture(@Param('id') id: string): Promise<LectureModel> {
    return this.lessonService.getLessonLecture(id);
  }

  @ApiOkResponse({
    description: 'lesson join response',
    type: LessonIdResponse,
  })
  @ApiBody({
    type: JoinLessonModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          userId: 'User id',
        } as JoinLessonModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post('/:id/join')
  async joinLesson(
    @Param('id') id: string,
    @Body() body: JoinLessonModel,
  ): Promise<LessonIdResponse> {
    return this.lessonService.joinLesson(id, body);
  }
}
