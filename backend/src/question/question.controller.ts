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
  ApiTags,
} from '@nestjs/swagger';
import {
  IdQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from 'question/question.dto';
import { QuestionService } from 'question/question.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Question')
@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOkResponse({
    description: 'question create response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: QuestionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          LessonId: 'Lesson Id',
          Title: 'Question Title',
          Description: 'Question decsription',
        } as QuestionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Post()
  async registerQuestion(
    @Body() body: QuestionModel
  ): Promise<string> {
    return this.questionService.postQuestion(body);
  }

  @ApiOkResponse({
    description: 'question delete response',
    type: String,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: IdQuestionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          Id: 'id',
        } as IdQuestionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteQuestion(
    @Body() body: IdQuestionModel
  ): Promise<string> {
    return this.questionService.deleteQuestion(body);
  }

  @ApiOkResponse({
    description: 'question content response',
    type: QuestionModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the question',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getQuestion(
    @Query('id') id: string
  ): Promise<QuestionModel> {
    return this.questionService.getQuestion(id);
  }

  @ApiOkResponse({
    description: 'question update response',
    type: String,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the question',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization_token',
    description: 'token',
    required: true,
  })
  @ApiBody({
    type: UpdateQuestionModel,
    description: 'user data model',
    examples: {
      a: {
        value: {
          LessonId: 'id',
          Title: 'Question Title',
          Description: 'Question decsription',
          Data: 'Data of the question',
        } as UpdateQuestionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateQuestion(
    @Query('id') id: string,
    @Body() body: UpdateQuestionModel,
  ): Promise<string> {
    return this.questionService.updateQuestion(id, body);
  }
}
