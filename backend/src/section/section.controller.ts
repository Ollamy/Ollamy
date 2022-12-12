import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SectionModel } from 'section/section.dto';
import { SectionService } from 'section/section.service';

@ApiBadRequestResponse({description: "Parameters are not valid"})
@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOkResponse({
    description: "section create response",
    type: String,
  })
  @ApiBody({
    type: SectionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Course_id: '7d95d801-b748-40b4-995d-b8d79e0c1a0f'
        } as SectionModel,
      },
    },
  })
  @Post()
  async registerSection(@Body() body: SectionModel): Promise<string> {
    return this.sectionService.postSection(body);
  }
}
