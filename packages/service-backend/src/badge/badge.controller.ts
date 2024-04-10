import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { OllContext } from 'context/context.decorator';
import { GetUsersBadges } from './badge.dto';
import { BadgeService } from './badge.service';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Badge')
@Controller('/badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @ApiOkResponse({
    description: 'Unlocked Badges content response',
    type: GetUsersBadges,
  })
  @LoggedMiddleware(true)
  @Get('unlocked')
  async getBadges(@OllContext() ctx: any): Promise<GetUsersBadges> {
    return this.badgeService.getUserBadge(ctx);
  }
}
