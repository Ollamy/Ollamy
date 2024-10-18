import { Controller, Post, Body, Put, Delete, Param, Get } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import {
    CreateLectureModel,
    IdLectureModel,
    LectureModel,
    UpdateLectureModel,
    LectureIdResponse,
} from './lecture.dto';
import { LectureService } from 'lecture/lecture.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Lecture')
@Controller('/lecture')
export class LectureController {
    constructor(private readonly lectureService: LectureService) { }

    @ApiOkResponse({
        description: 'Lecture create response',
        type: LectureIdResponse,
    })
    @ApiBody({
        type: CreateLectureModel,
        description: 'Lecture data model',
        examples: {
            template: {
                value: {
                    lessonId: 'Lesson Id',
                    data: 'Lecture data',
                } as CreateLectureModel,
            },
        },
    })
    @LoggedMiddleware(true)
    @Post()
    async createLecture(@Body() body: CreateLectureModel): Promise<LectureIdResponse> {
        return this.lectureService.postLecture(body);
    }

    @ApiOkResponse({
        description: 'Lecture delete response',
        type: LectureIdResponse,
    })
    @ApiBody({
        type: IdLectureModel,
        description: 'Lecture data model',
        examples: {
            template: {
                value: {
                    id: 'id',
                } as IdLectureModel,
            },
        },
    })
    @LoggedMiddleware(true)
    @Delete()
    async deleteLecture(@Body() body: IdLectureModel): Promise<LectureIdResponse> {
        return this.lectureService.deleteLecture(body);
    }

    @ApiOkResponse({
        description: 'Lecture content response',
        type: LectureModel,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the lecture',
        required: true,
    })
    @LoggedMiddleware(true)
    @Get('/:id')
    async getLecture(@Param('id') id: string): Promise<LectureModel> {
        return this.lectureService.getLecture({ id } as IdLectureModel);
    }

    @ApiOkResponse({
        description: 'Lecture update response',
        type: LectureIdResponse,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the lecture',
        required: true,
    })
    @ApiBody({
        type: UpdateLectureModel,
        description: 'Lecture data model',
        examples: {
            template: {
                value: {
                    lessonId: 'Lesson Id',
                    data: 'Lecture data',
                } as UpdateLectureModel,
            },
        },
    })
    @LoggedMiddleware(true)
    @Put('/:id')
    async updateLecture(
        @Param('id') id: string,
        @Body() body: UpdateLectureModel,
    ): Promise<LectureIdResponse> {
        return this.lectureService.updateLecture({ id: id } as IdLectureModel, body);
    }
}
