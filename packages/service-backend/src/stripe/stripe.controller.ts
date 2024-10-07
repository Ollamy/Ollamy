import {
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
  RawBodyRequest,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { CurrencyType, CreateProductDto } from './stripe.dto';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import { OllContext } from 'context/context.decorator';

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
    return await this.stripeService.createPaymentIntent(amount, currency);
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      await this.stripeService.handleWebhook(req.rawBody, signature);
      return 'Webhook received';
    } catch (err) {
      return 'Webhook error';
    }
  }

  @ApiOkResponse({
    description: 'Product created successfully',
  })
  @ApiBody({ type: CreateProductDto })
  @LoggedMiddleware(true)
  @Post('create-product')
  async createProduct(
    @Body() body: CreateProductDto,
    @OllContext() ctx: any,
  ) {
    return await this.stripeService.createProduct(body, ctx);
  }

  @ApiOkResponse({
    description: 'Product created successfully',
  })
  @LoggedMiddleware(true)
  @Get('retrieve-products')
  async retrieveProducts(@OllContext() ctx: any) {
    return await this.stripeService.retrieveProducts(ctx);
  }

  @ApiOkResponse({
    description: 'Products deleted successfully',
  })
  @ApiBody({
    type: [String], examples: {
      example1: {
        value: ['prod_1', 'prod_2'],
        summary: 'Example of products to delete'
      },
    }
  })
  @LoggedMiddleware(true)
  @Delete('delete-products')
  async deleteProducts(@Body() data: string[], @OllContext() ctx: any) {
    return await this.stripeService.deleteProducts(data, ctx);
  }

  @ApiOkResponse({
    description: 'Payment link created successfully',
  })
  @ApiQuery({ name: 'product_id', required: true })
  @LoggedMiddleware(true)
  @Get('create-payment-link')
  async createPaymentLink(
    @Query('product_id') product_id: string,
    @OllContext() ctx: any,
  ) {
    return await this.stripeService.createPaymentLink(product_id, ctx);
  }

  @ApiOkResponse({
    description: 'Session status checked successfully',
  })
  @ApiQuery({ name: 'session_id', required: true })
  @LoggedMiddleware(true)
  @Get('check-session-status')
  async checkSessionStatus(
    @Query('session_id') session_id: string,
  ) {
    return await this.stripeService.checkSessionStatus(session_id);
  }
}
