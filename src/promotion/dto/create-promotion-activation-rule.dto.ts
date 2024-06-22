import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePromotionActivationRuleDTO {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  productSku: string;
}
