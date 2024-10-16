import { LoggedMiddleware } from 'middleware/middleware.decorator';
import {
  CreateQuestionModel,
  GetQuestionModel,
  IdQuestionModel,
  QuestionIdResponse,
  UpdateQuestionModel,
  UpdateQuestionOrderModel,
} from 'question/question.dto';
import { QuestionService } from 'question/question.service';

import { QuestionAnswerModel } from 'answer/answer.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  ValidateAnswerModel,
  ValidateAnswerResponse,
} from 'question/question.dto';
import { AnswerType, QuestionType, QuestionDifficulty } from '@prisma/client';
import { OllContext } from 'context/context.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Question')
@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOkResponse({
    description: 'question create response',
    type: QuestionIdResponse,
  })
  @ApiBody({
    type: CreateQuestionModel,
    description: 'user data model',
  })
  @LoggedMiddleware(true)
  @Post()
  async registerQuestion(
    @Body() body: CreateQuestionModel,
  ): Promise<QuestionIdResponse> {
    return this.questionService.postQuestion(body);
  }

  @ApiOkResponse({
    description: 'question delete response',
    type: QuestionIdResponse,
  })
  @ApiBody({
    type: IdQuestionModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          id: 'id',
        } as IdQuestionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteQuestion(
    @Body() body: IdQuestionModel,
  ): Promise<QuestionIdResponse> {
    return this.questionService.deleteQuestion(body);
  }

  @ApiOkResponse({
    description: 'question content response',
    type: GetQuestionModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the question',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getQuestion(@Param('id') id: string): Promise<GetQuestionModel> {
    return this.questionService.getQuestion(id);
  }

  @ApiOkResponse({
    description: 'question update response',
    type: QuestionIdResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the question',
    required: true,
  })
  @ApiBody({
    type: UpdateQuestionModel,
    description: 'user data model',
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() body: UpdateQuestionModel,
  ): Promise<QuestionIdResponse> {
    return this.questionService.updateQuestion(id, body);
  }

  @ApiOkResponse({
    description: 'Question order changed',
    type: QuestionIdResponse,
  })
  @ApiBody({
    type: UpdateQuestionOrderModel,
    description: 'update question order data model',
    examples: {
      template: {
        value: {
          before: 'order id',
          after: 'order id',
          origin: 'question id',
        } as UpdateQuestionOrderModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/order')
  async updateQuestionOrder(
    @Body() body: UpdateQuestionOrderModel,
  ): Promise<object> {
    return this.questionService.updateQuestionOrder(body);
  }

  @ApiOkResponse({
    description: 'question content response',
    type: [QuestionAnswerModel],
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the question',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id/answers')
  async getQuestionAnswers(
    @Param('id') id: string,
  ): Promise<QuestionAnswerModel[]> {
    return this.questionService.getQuestionAnswers(id);
  }

  @ApiOkResponse({
    description: 'question content response',
    type: ValidateAnswerResponse,
  })
  @LoggedMiddleware(true)
  @Post('/validate')
  async validateAnswer(
    @Body() body: ValidateAnswerModel,
    @OllContext() ctx: any,
  ): Promise<ValidateAnswerResponse> {
    return this.questionService.validateAnswer(body, ctx);
  }
}
