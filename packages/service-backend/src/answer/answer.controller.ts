import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAnswerModel,
  IdAnswerModel,
  AnswerModel,
  UpdateAnswerModel,
} from 'answer/answer.dto';
import { AnswerService } from 'answer/answer.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Answer')
@Controller('/answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOkResponse({
    description: 'answer create response',
    type: String,
  })
  @ApiBody({
    type: CreateAnswerModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          questionId: 'Question Id',
          data: 'Answer data',
          picture: 'Picture data',
        } as CreateAnswerModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerAnswer(@Body() body: CreateAnswerModel): Promise<string> {
    return this.answerService.postAnswer(body);
  }

  @ApiOkResponse({
    description: 'answer delete response',
    type: String,
  })
  @ApiBody({
    type: IdAnswerModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          id: 'id',
        } as IdAnswerModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteAnswer(@Body() body: IdAnswerModel): Promise<string> {
    return this.answerService.deleteAnswer(body);
  }

  @ApiOkResponse({
    description: 'answer content response',
    type: AnswerModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the answer',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getAnswer(@Query('id') id: string): Promise<AnswerModel> {
    return this.answerService.getAnswer(id);
  }

  @ApiOkResponse({
    description: 'answer update response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the answer',
    required: true,
  })
  @ApiBody({
    type: UpdateAnswerModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          questionId: 'Question Id',
          data: 'Answer data',
          picture: 'Picture data',
        } as UpdateAnswerModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateAnswer(
    @Query('id') id: string,
    @Body() body: UpdateAnswerModel,
  ): Promise<string> {
    return this.answerService.updateAnswer(id, body);
  }
}
