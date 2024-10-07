import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum CurrencyType {
    USD = 'usd',
    EUR = 'eur',
    GBP = 'gbp',
}

export enum ProductRenewal {
    DAY = 'day',
    MONTH = 'month',
    WEEK = 'week',
    YEAR = 'year',
}

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'My product',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'My perfect description',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'The price of the product in cents',
        example: 1000,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'The currency of the product',
        example: CurrencyType.USD,
        enum: CurrencyType,
    })
    @IsEnum(CurrencyType)
    currency: CurrencyType;

    @ApiProperty({
        description: 'The renewal of the product',
        example: ProductRenewal.MONTH,
        enum: ProductRenewal,
    })
    @IsEnum(ProductRenewal)
    @IsOptional()
    renewal?: ProductRenewal;
}
