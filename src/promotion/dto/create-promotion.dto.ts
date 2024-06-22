import { ValidateNested, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePromotionActivationRuleDTO } from './create-promotion-activation-rule.dto';
import { CreatePromotionDiscountRuleDTO } from './create-promotion-discount-rule.dto';

export class CreatePromotionDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePromotionActivationRuleDTO)
  productActivation: CreatePromotionActivationRuleDTO[];

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePromotionDiscountRuleDTO)
  productDiscount: CreatePromotionDiscountRuleDTO[];
}
