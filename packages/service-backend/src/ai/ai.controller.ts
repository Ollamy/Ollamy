import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Put,
  Param,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiTags,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateQuestionResponse, FileAi, QuestionResponse } from 'ai/ai.dto';
import { AiService } from 'ai/ai.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { OllContext } from 'context/context.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @LoggedMiddleware(true)
  @Post('/create-generated-question')
  async createQuestion(
    @Body() questions: CreateQuestionResponse,
  ): Promise<Boolean> {
    return await this.aiService.createQuizz(questions);
  }
}
