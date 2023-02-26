import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
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
  ChapterModel,
  IdChapterModel,
  UpdateChapterModel,
  CreateChapterModel,
} from 'chapter/chapter.dto';
import { ChapterService } from 'chapter/chapter.service';
import { LessonModel } from 'lesson/lesson.dto';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Chapter')
@Controller('/chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @ApiOkResponse({
    description: 'chapter create response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: CreateChapterModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          sectionId: 'Section Id',
          title: 'Chapter Title',
          description: 'Chapter description',
        } as CreateChapterModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerChapter(@Body() body: CreateChapterModel): Promise<string> {
    return this.chapterService.postChapter(body);
  }

  @ApiOkResponse({
    description: 'chapter delete response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: IdChapterModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          id: 'id',
        } as IdChapterModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteChapter(@Body() body: IdChapterModel): Promise<string> {
    return this.chapterService.deleteChapter(body);
  }

  @ApiOkResponse({
    description: 'chapter content',
    type: ChapterModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the chapter',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getChapter(@Param('id') id: string): Promise<ChapterModel> {
    return this.chapterService.getChapter(id);
  }

  @ApiOkResponse({
    description: 'chapter update response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the chapter',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: UpdateChapterModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          sectionId: 'id',
          title: 'Chapter Title',
          description: 'Chapter description',
        } as UpdateChapterModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateChapter(
    @Param('id') id: string,
    @Body() body: UpdateChapterModel,
  ): Promise<string> {
    return this.chapterService.updateChapter(id, body);
  }

  @ApiOkResponse({
    description: "chapter's lessons",
    type: [LessonModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the chapter',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/lessons/:id')
  async getChapterLessons(@Param('id') id: string): Promise<LessonModel[]> {
    return this.chapterService.getChapterLessons(id);
  }
}
