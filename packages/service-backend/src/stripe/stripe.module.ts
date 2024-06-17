import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from 'stripe/stripe.service';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
