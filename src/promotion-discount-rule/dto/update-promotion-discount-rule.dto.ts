import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionDiscountRuleDto } from './create-promotion-discount-rule.dto';

export class UpdatePromotionDiscountRuleDto extends PartialType(CreatePromotionDiscountRuleDto) {}
