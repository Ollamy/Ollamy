import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { STRIPE_PRIVATE_KEY } from '../setup';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot()],
      providers: [
        StripeService,
        {
          provide: STRIPE_PRIVATE_KEY,
          useFactory: async (configService: ConfigService) =>
            configService.get(STRIPE_PRIVATE_KEY),
          inject: [ConfigService],
        },
      ],
    };
  }
}