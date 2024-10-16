import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EventTriggered } from './event.dto';
import { EventService } from './event.service';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { OllContext } from 'context/context.decorator';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('Event')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOkResponse({
    description: 'Event triggered response',
    type: EventTriggered || Array<[]>,
  })
  @LoggedMiddleware(true)
  @Get()
  async logEventandTriggerBadge(
    @OllContext() ctx: any,
  ): Promise<EventTriggered | Array<[]>> {
    return this.eventService.getTriggeredEvents(ctx.__user.id);
  }
}
