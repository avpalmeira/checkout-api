import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Max,
  IsPositive,
} from 'class-validator';

export class CreatePromotionDiscountRuleDTO {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  productSku: string;

  @IsPositive()
  @Max(1)
  @IsNotEmpty()
  discount: number;
}
