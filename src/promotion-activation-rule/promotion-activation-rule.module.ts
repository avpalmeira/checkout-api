import { Module } from '@nestjs/common';
import { PromotionActivationRuleService } from './promotion-activation-rule.service';

@Module({
  controllers: [],
  providers: [PromotionActivationRuleService],
})
export class PromotionActivationRuleModule {}
