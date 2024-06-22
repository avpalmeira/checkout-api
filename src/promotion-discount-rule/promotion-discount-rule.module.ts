import { Module } from '@nestjs/common';
import { PromotionDiscountRuleService } from './promotion-discount-rule.service';

@Module({
  controllers: [],
  providers: [PromotionDiscountRuleService],
})
export class PromotionDiscountRuleModule {}
