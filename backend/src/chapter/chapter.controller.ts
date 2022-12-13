import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ChapterModel } from 'chapter/chapter.dto';
import { ChapterService } from 'chapter/chapter.service';

@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @ApiOkResponse({
    description: "chapter create response",
    type: String,
  })
  @ApiBody({
    type: ChapterModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Section_id: '7d95d801-b748-40b4-995d-b8d79e0c1a0f',
          Title: "Chapter Title",
          Description: "Chapter decsription"
        } as ChapterModel,
      },
    },
  })
  @Post()
  async registerChapter(@Body() body: ChapterModel): Promise<string> {
    return this.chapterService.postChapter(body);
  }
}
