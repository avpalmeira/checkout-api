import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CalculateCheckoutItemsDTO } from './dto/calculate-checkout-items.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  // TODO: Return HTTP code 200
  @Post()
  calculate(@Body() calculateCheckoutItemsDto: CalculateCheckoutItemsDTO) {
    return this.checkoutService.calculate(calculateCheckoutItemsDto);
  }
}
