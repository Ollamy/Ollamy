import { Controller, Get, Post, Query, Headers, Req, RawBodyRequest, Body } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { CurrencyType } from './stripe.dto';
import { LoggedMiddleware } from '../middleware/middleware.decorator';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) { }

  @ApiOkResponse({
    description: 'Payment intent created successfully',
  })
  @ApiQuery({ name: 'amount', required: true })
  @ApiQuery({
    name: 'currency',
    required: true,
    enum: CurrencyType,
  })
  @LoggedMiddleware(true)
  @Get('create-payment-intent')
  async createPaymentIntent(
    @Query('amount') amount: number,
    @Query('currency') currency: CurrencyType,
  ) {
    return await this.stripeService.createPaymentIntent(amount, currency)
  }

  @Post('webhook')
  async handleWebhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') signature: string,) {
    try {
      await this.stripeService.handleWebhook(req.rawBody, signature);
      return 'Webhook received';
    } catch (err) {
      return 'Webhook error';
    }
  }
}
