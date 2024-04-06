import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BadgeModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsString()
  image_name: string;
}

export class GetUsersBadges {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BadgeModel)
  badges: BadgeModel[];
}

export class GetBadgeImageUrl {
  @ApiProperty()
  @IsString()
  url: string;
}
