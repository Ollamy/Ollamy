import {
  Controller,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiTags,
  ApiConsumes,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateQuestionResponse, FileAi, QuestionResponse } from 'ai/ai.dto';
import { AiService } from 'ai/ai.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseTrueResponse } from '../course/course.dto';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Ai')
@Controller('/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The questions generated from the pdf file',
    type: QuestionResponse,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @LoggedMiddleware(true)
  @Post('/generate-question')
  async generateText(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<QuestionResponse> {
    const AiFile: FileAi = {
      data: file.buffer.toString('base64'),
      mimeType: file.mimetype,
    };

    return await this.aiService.generateText(AiFile);
  }

  @ApiBody({
    type: CreateQuestionResponse,
    description: 'Object containing a list of questions with their answers to create'
  })
  @ApiParam({
    name: 'lessonId',
    type: 'string',
    description: 'The lesson id to create the questions for',
  })
  @ApiResponse({
    status: 200,
    type: CourseTrueResponse,
  })
  @LoggedMiddleware(true)
  @Post('/create-generated-question/:lessonId')
  async createQuestion(
    @Body() questions: CreateQuestionResponse,
    @Param('lessonId') lessonId: string,
  ) {
    return await this.aiService.createQuizz(questions, lessonId);
  }
}
