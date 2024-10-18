import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  ConflictException,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiTags,
  ApiConsumes,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AllowedMimeType, Course, FileAi, Question, } from 'ai/ai.dto';
import { AiService } from 'ai/ai.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnswerType } from '@prisma/client';

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
    type: [Question],
  })
  @ApiQuery({
    name: 'numberOfQuestions',
    type: 'number',
    schema: {
      minimum: 1,
    },
  })
  @ApiQuery({
    name: 'typeOfQuestion',
    type: 'string',
    enum: AnswerType,
    schema: {
      default: 'MULTIPLE_CHOICE',
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @LoggedMiddleware(true)
  @Post('/generate-question')
  async generateText(
    @UploadedFile() file: Express.Multer.File,
    @Query('numberOfQuestions') numberOfQuestions: number = 10,
    @Query('typeOfQuestion') typeOfQuestion: AnswerType = 'MULTIPLE_CHOICE',
  ): Promise<Question[]> {
    if (!file) {
      throw new ConflictException('File is empty');
    }

    if (numberOfQuestions < 1) {
      throw new ConflictException('Number of questions must be at least 1');
    }

    if (!Object.values(AllowedMimeType).includes(file.mimetype as AllowedMimeType)) {
      throw new ConflictException(`File type ${file.mimetype} is not allowed`);
    }

    const AiFile: FileAi = {
      data: file.buffer.toString('base64'),
      mimeType: file.mimetype,
    };

    return await this.aiService.generateText(AiFile, numberOfQuestions, typeOfQuestion);
  }


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
    description: 'The course generated from the pdf file',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @LoggedMiddleware(true)
  @Post('/generate-course')
  async generateCourse(@UploadedFile() file: Express.Multer.File): Promise<Course> {
    if (!file) {10
      throw new ConflictException('File is empty');
    }

    if (!Object.values(AllowedMimeType).includes(file.mimetype as AllowedMimeType)) {
      throw new ConflictException(`File type ${file.mimetype} is not allowed`);
    }

    const AiFile: FileAi = {
      data: file.buffer.toString('base64'),
      mimeType: file.mimetype,
    };

    return await this.aiService.generateCourse(AiFile);
  }


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
    type: [Question],
  })
  @ApiParam({
    name: 'lessonId',
    type: 'string',
    description: 'The lesson id to create the questions for',
  })
  @ApiQuery({
    name: 'numberOfQuestions',
    type: 'number',
    schema: {
      minimum: 1,
    },
  })
  @ApiQuery({
    name: 'typeOfQuestion',
    type: 'string',
    enum: AnswerType,
    schema: {
      default: 'MULTIPLE_CHOICE',
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @LoggedMiddleware(true)
  @Post('/create-and-generate-question/:lessonId')
  async createAndGenerateQuestion(
    @UploadedFile() file: Express.Multer.File,
    @Param('lessonId') lessonId: string,
    @Query('numberOfQuestions') numberOfQuestions: number = 10,
    @Query('typeOfQuestion') typeOfQuestion: AnswerType = 'MULTIPLE_CHOICE',
  ) {

    const questions = await this.generateText(file, numberOfQuestions, typeOfQuestion);
    if (!questions) {
      throw new ConflictException('Failed to generate questions');
    }
    return await this.aiService.createQuizz(questions, lessonId);
  }

  @ApiResponse({
    status: 200,
    description: 'The fake answer generated from the question',
  })
  @ApiParam({
    name: 'questionId',
    type: 'string',
    description: 'The question id to generate the fake answer for',
  })
  @ApiQuery({
    name: 'numberWrongAnswers',
    type: 'number',
    schema: {
      minimum: 1,
      maximum: 10,
      default: 3,
    },
  })
  @LoggedMiddleware(true)
  @Post('/generate-fake-answer/:questionId')
  async generateFakeAnswer(
    @Param('questionId') questionId: string,
    @Query('numberWrongAnswers') numberWrongAnswers: number = 3,
  ) {
    return await this.aiService.generateFakeAnswer(questionId, numberWrongAnswers);
  }
}
