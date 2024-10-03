import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import {
  CourseUserStatistic,
  GradeStatisticModel,
  StatisticOperation,
  StatisticType,
} from './statistic.dto';
import { StatisticService } from './statistic.service';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiOkResponse({
    description: 'Course statistics',
    type: [GradeStatisticModel],
  })
  @ApiParam({
    name: 'type',
    description: 'choose type of statistic',
    enum: StatisticType,
  })
  @ApiParam({
    name: 'operation',
    description: 'choose operation of statistic',
    enum: StatisticOperation,
  })
  @ApiQuery({
    name: 'courseId',
    description: 'course id',
  })
  @LoggedMiddleware(true)
  @Get(':type/:operation')
  async grade(
    @Param('type') type: StatisticType,
    @Param('operation') operation: StatisticOperation,
    @OllContext() ctx: any,
    @Query('courseId') courseId?: string,
  ): Promise<GradeStatisticModel[]> {
    return this.statisticService.grade(type, operation, ctx, courseId);
  }

  @ApiOkResponse({
    description: 'User statistics',
    type: [CourseUserStatistic],
  })
  @ApiQuery({
    name: 'courseId',
    description: 'course id',
  })
  @LoggedMiddleware(true)
  @Get('user')
  async user(
    @OllContext() ctx: any,
    @Query('courseId') courseId?: string,
  ): Promise<CourseUserStatistic[]> {
    return this.statisticService.user(ctx, courseId);
  }
}
