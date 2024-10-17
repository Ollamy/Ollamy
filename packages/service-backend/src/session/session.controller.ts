import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import {
  CreateSessionModel,
  GetSessionModel,
  ValidateQuestionSessionModel,
  ValidateQuestionSessionResponseModel,
} from './session.dto';
import { SessionService } from './session.service';

@ApiOkResponse({
  description: 'session create response',
})
@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOkResponse({
    type: CreateSessionModel,
  })
  @ApiParam({
    name: 'lessonId',
    required: true,
    description: 'Lesson Id',
  })
  @LoggedMiddleware(true)
  @Post('create/:lessonId')
  async create(
    @Param('lessonId') lessonId: string,
    @OllContext() ctx: any,
  ): Promise<CreateSessionModel> {
    return this.sessionService.createSession(lessonId, ctx);
  }

  @ApiOkResponse({
    type: GetSessionModel,
  })
  @ApiParam({
    name: 'sessionId',
    required: true,
    description: 'Session Id',
  })
  @LoggedMiddleware(true)
  @Get(':sessionId')
  async getSession(
    @Param('sessionId') sessionId: string,
  ): Promise<GetSessionModel> {
    return this.sessionService.getSession(sessionId);
  }

  @ApiOkResponse({
    type: ValidateQuestionSessionResponseModel,
  })
  @ApiParam({
    name: 'sessionId',
    required: true,
    description: 'Session Id',
  })
  @ApiBody({
    type: ValidateQuestionSessionModel,
    required: true,
    description: 'Validate question model',
    examples: {
      template: {
        value: {
          questionId: 'question id',
          answer: {
            id: 'answer id',
            data: 'maybe an answer',
          },
        },
      },
    },
  })
  @LoggedMiddleware(true)
  @Post('validate-question/:sessionId')
  async validateQuestion(
    @Param('sessionId') sessionId: string,
    @Body() body: ValidateQuestionSessionModel,
  ): Promise<ValidateQuestionSessionResponseModel> {
    return this.sessionService.validateQuestion(sessionId, body);
  }
}
