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
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateQuestionModel,
  IdQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
  QuestionIdResponse,
  UpdateQuestionOrderModel,
} from 'question/question.dto';
import { AnswerType, QuestionType, QuestionDifficulty } from '@prisma/client';
import { QuestionService } from 'question/question.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { AnswerModel } from '../answer/answer.dto';

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
    examples: {
      template: {
        value: {
          lessonId: 'Lesson Id',
          title: 'Question Title',
          description: 'Question decsription',
          data: 'Question data',
          typeAnswer: AnswerType.TEXT,
          typeQuestion: QuestionType.TEXT,
          picture: 'Question picture',
          difficulty: QuestionDifficulty.BEGINNER,
          order: 0,
        } as CreateQuestionModel,
      },
    },
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
    type: QuestionModel,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the question',
    required: true,
  })
  @LoggedMiddleware(true)
  @Get('/:id')
  async getQuestion(@Query('id') id: string): Promise<QuestionModel> {
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
    examples: {
      template: {
        value: {
          lessonId: 'id',
          title: 'Question Title',
          description: 'Question decsription',
          data: 'Data of the question',
          trustAnswerId: 'id',
        } as UpdateQuestionModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put('/:id')
  async updateQuestion(
    @Query('id') id: string,
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
    description: 'user data model',
    examples: {
      template: {
        value: {
          origin: 'Origin id',
          dest: 'Target id',
        } as UpdateQuestionOrderModel,
      },
    },
  })
  @LoggedMiddleware(true)
  @Put()
  async updateQuestionOrder(
    @Body() body: UpdateQuestionOrderModel,
  ): Promise<object> {
    return this.questionService.updateQuestionOrder(body);
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
  @LoggedMiddleware(true)
  @Get('/:id/answers')
  async getQuestionAnswers(@Query('id') id: string): Promise<AnswerModel[]> {
    return this.questionService.getQuestionAnswers(id);
  }
}
