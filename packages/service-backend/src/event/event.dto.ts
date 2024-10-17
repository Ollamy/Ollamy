import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class LogEventData {
  @ApiProperty({
    description: 'name of the event',
    example: 'courseCompleted',
    type: String,
  })
  @IsString()
  eventName: string;

  @ApiProperty({
    description: 'event data',
    example: { courseCompleted: 1 },
    type: Object,
  })
  @IsString()
  data: object;
}

export class EventTriggered {
  @ApiProperty({
    description: 'Event type triggered',
    example: 'BADGE_UNLOCK',
    type: String,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Badge name',
    example: 'First Lesson',
    type: String,
  })
  @IsString()
  badge_name: string;
}
