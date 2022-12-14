import {
  Controller,
  Post,
  Body,
  Headers,
  Query,
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
} from '@nestjs/swagger';
import {
  ChapterModel,
  IdChapterModel,
  UpdateChapterModel,
} from 'chapter/chapter.dto';
import { ChapterService } from 'chapter/chapter.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
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
    type: ChapterModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          SectionId: 'Section Id',
          Title: 'Chapter Title',
          Description: 'Chapter decsription',
        } as ChapterModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerChapter(
    @Body() body: ChapterModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.chapterService.postChapter(body, token);
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
      a: {
        value: {
          Id: 'id',
        } as IdChapterModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteChapter(
    @Body() body: IdChapterModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.chapterService.deleteChapter(body, token);
  }

  @ApiOkResponse({
    description: 'chapter content',
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
  @LoggedMiddleware(true)
  @Get('/:id')
  async getChapter(
    @Query('id') id: string,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.chapterService.getChapter(id, token);
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
      a: {
        value: {
          SectionId: 'id',
          Title: 'Chapter Title',
          Description: 'Chapter decsription',
        } as UpdateChapterModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateChapter(
    @Query('id') id: string,
    @Body() body: UpdateChapterModel,
  ): Promise<string> {
    return this.chapterService.updateChapter(id, body);
  }
}
