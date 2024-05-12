import { IsArray, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BaseBadgeModel {
  @ApiProperty({ description: 'The unique identifier of the badge' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The unique identifier of the badge name' })
  @IsUUID()
  name: string;

  @ApiProperty({ description: 'The description of the badge' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The order of the badge' })
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'The name of the badge image' })
  @IsString()
  image_name: string;

  @ApiProperty({ description: 'The color of the badge' })
  @IsString()
  color: string;
}

export class BadgeModel extends BaseBadgeModel { }

export class GetUsersBadges {
  @ApiProperty({ description: 'List of badges associated with the user', type: [BadgeModel] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BadgeModel)
  badges: BadgeModel[];
}

export class GetBadgeImageUrl {
  @ApiProperty({ description: 'The URL of the badge image' })
  @IsString()
  url: string;
}
