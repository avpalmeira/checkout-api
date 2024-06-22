import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
