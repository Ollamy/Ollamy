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
  CreateSectionModel,
  IdSectionModel,
  SectionModel,
  UpdateSectionModel,
} from 'section/section.dto';
import { SectionService } from 'section/section.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { LessonModel } from 'lesson/lesson.dto';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Section')
@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOkResponse({
    description: 'section create response',
    type: String,
  })
  @ApiBody({
    type: CreateSectionModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          courseId: 'Course Id',
          title: 'Section Title',
          description: 'Section decsription',
        } as CreateSectionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerSection(@Body() body: CreateSectionModel): Promise<string> {
    return this.sectionService.postSection(body);
  }

  @ApiOkResponse({
    description: 'section delete response',
    type: String,
  })
  @ApiBody({
    type: IdSectionModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          id: 'id',
        } as IdSectionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteSection(@Body() body: IdSectionModel): Promise<string> {
    return this.sectionService.deleteSection(body);
  }

  @ApiOkResponse({
    description: 'section content response',
    type: SectionModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the section',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getSection(@Param('id') id: string): Promise<SectionModel> {
    return this.sectionService.getSection(id);
  }

  @ApiOkResponse({
    description: 'section update response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the section',
    required: true,
  })
  @ApiBody({
    type: UpdateSectionModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          courseId: 'id',
          title: 'Section Title',
          description: 'Section decsription',
        } as UpdateSectionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateSection(
    @Param('id') id: string,
    @Body() body: UpdateSectionModel,
  ): Promise<string> {
    return this.sectionService.updateSection(id, body);
  }

  @ApiOkResponse({
    description: "section's lessons",
    type: [LessonModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the section',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/lessons/:id')
  async getSectionLessons(@Param('id') id: string): Promise<LessonModel[]> {
    return this.sectionService.getSectionLessons(id);
  }
}
