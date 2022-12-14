import {
  Controller,
  Post,
  Body,
  Headers,
  Put,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  IdSectionModel,
  SectionModel,
  UpdateSectionModel,
} from 'section/section.dto';
import { SectionService } from 'section/section.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOkResponse({
    description: 'section create response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: SectionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          CourseId: 'Course Id',
          Title: 'Section Title',
          Description: 'Section decsription',
        } as SectionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerSection(
    @Body() body: SectionModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.sectionService.postSection(body, token);
  }

  @ApiOkResponse({
    description: 'section delete response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: IdSectionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Id: 'id',
        } as IdSectionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteSection(
    @Body() body: IdSectionModel,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.sectionService.deleteSection(body, token);
  }

  @ApiOkResponse({
    description: 'section content response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the section',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getSection(
    @Query('id') id: string,
    @Headers('Authorization_token') token: string,
  ): Promise<string> {
    return this.sectionService.getSection(id, token);
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
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: UpdateSectionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          CourseId: 'id',
          Title: 'Section Title',
          Description: 'Section decsription',
        } as UpdateSectionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateSection(
    @Query('id') id: string,
    @Body() body: UpdateSectionModel,
  ): Promise<string> {
    return this.sectionService.updateSection(id, body);
  }
}
