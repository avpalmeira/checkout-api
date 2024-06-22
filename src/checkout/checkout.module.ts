import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PromotionModule } from 'src/promotion/promotion.module';
import { PromotionService } from 'src/promotion/promotion.service';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [PromotionModule, ProductModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, PromotionService, ProductService],
})
export class CheckoutModule {}
