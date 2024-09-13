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
    example: { value: 1 },
    type: Object,
  })
  @IsString()
  data: object;
}

export class EventTriggered {
  @ApiProperty({
    description: 'Event type triggered',
    example: 'badge',
    type: String,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Event id',
    example: '3a962c98-8f03-4b55-a6a7-31422cbd033a',
    type: String,
  })
  @IsUUID()
  id: string;
}

export class EventNotTriggered {
  @ApiProperty({
    description: 'name of the event',
    example: 'courseCompleted',
    type: String,
  })
  @IsString()
  eventName: string;

  @ApiProperty({
    description: 'name of the event',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  logged: boolean;
}
