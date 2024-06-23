import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PromotionModule } from '../promotion/promotion.module';
import { PromotionService } from '../promotion/promotion.service';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';

@Module({
  imports: [PromotionModule, ProductModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, PromotionService, ProductService],
})
export class CheckoutModule {}
