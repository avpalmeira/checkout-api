import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Product } from 'src/product/entities/product.entity';
import { PromotionActivationRule } from './entities/promotion-activation-rule.entity';
import { PromotionDiscountRule } from './entities/promotion-discount-rule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Promotion,
      PromotionActivationRule,
      PromotionDiscountRule,
      Product,
    ]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
