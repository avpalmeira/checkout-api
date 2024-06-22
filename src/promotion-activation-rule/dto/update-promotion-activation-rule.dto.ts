import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionActivationRuleDto } from './create-promotion-activation-rule.dto';

export class UpdatePromotionActivationRuleDto extends PartialType(CreatePromotionActivationRuleDto) {}
