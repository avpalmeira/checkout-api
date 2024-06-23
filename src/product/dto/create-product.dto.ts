import {
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { getGroupedItemsDiscountSKUs } from 'src/utils';
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @IsNotIn(getGroupedItemsDiscountSKUs(), {
    message: 'Same letter SKUs are reserved to discounts',
  })
  sku: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
