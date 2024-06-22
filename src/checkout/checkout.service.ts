import { Inject, Injectable } from '@nestjs/common';
import { CalculateCheckoutItemsDTO } from './dto/calculate-checkout-items.dto';
import { PromotionService } from 'src/promotion/promotion.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject()
    private readonly promotionService: PromotionService,

    @Inject()
    private readonly productService: ProductService,
  ) {}

  async calculate(
    calculateCheckoutItemsDto: CalculateCheckoutItemsDTO,
  ): Promise<number> {
    const checkoutItems = [...calculateCheckoutItemsDto.products];

    // get all promotions available <- check if a discount can be applied
    // loop through promotions
    // check if item is included in product activation

    let total = 0;

    for (const sku of checkoutItems) {
      const product = await this.productService.findOne(sku);

      if (!product) {
        throw new Error(`Product with SKU ${sku} not found`);
      }

      total += product.price;
    }
    return total;
  }
}
