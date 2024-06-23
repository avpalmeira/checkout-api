import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CalculateCheckoutItemsDTO } from './dto/calculate-checkout-items.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @HttpCode(200)
  @Post()
  calculate(@Body() calculateCheckoutItemsDto: CalculateCheckoutItemsDTO) {
    try {
      return this.checkoutService.calculate(calculateCheckoutItemsDto);
    } catch (e: any) {
      throw new BadRequestException(
        'An error was thrown during calculation',
        e,
      );
    }
  }
}
