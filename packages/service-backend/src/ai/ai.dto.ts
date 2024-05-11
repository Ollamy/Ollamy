import {
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class FileAi {
  @ApiProperty()
  @IsString()
  data: string;

  @ApiProperty()
  @IsString()
  mimeType: string;
}