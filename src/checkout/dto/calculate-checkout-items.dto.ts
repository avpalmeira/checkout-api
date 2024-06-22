import { IsArray, IsNotEmpty } from 'class-validator';

export class CalculateCheckoutItemsDTO {
  @IsArray()
  @IsNotEmpty()
  products: string[];
}
