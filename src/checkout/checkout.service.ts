import { Inject, Injectable } from '@nestjs/common';
import { CalculateCheckoutItemsDTO } from './dto/calculate-checkout-items.dto';
import { PromotionService } from 'src/promotion/promotion.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

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
    const checkoutItemsSku = [...calculateCheckoutItemsDto.products];
    // First populate the array of products
    let checkoutItems: Product[] = [];
    for (const sku of checkoutItemsSku) {
      const product = await this.productService.findOne(sku);

      if (!product) {
        throw new Error(`Product with SKU ${sku} not found`);
      }

      checkoutItems.push(product);
    }
    // TODO: move to utility function
    const alphaArray = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode('A'.charCodeAt(0) + i),
    );
    // Grouped items discount use SKUs that are not allowed for regular products
    const groupedItemsDiscountNewSKUs = alphaArray.map((char) =>
      char.repeat(6),
    );

    // Check for each promotion if discounts can be applied
    const allPromotions = await this.promotionService.findAll();
    for (const promotion of allPromotions) {
      // Map each SKU to quantity found (used when discount is not limited to qty)
      const groupMatchDiscount: Record<string, number> =
        checkoutItemsSku.reduce((map, sku) => {
          map[sku] = 0;
          return map;
        }, {});
      // Deep clone promotion's activation
      const originalProductActivation = JSON.parse(
        JSON.stringify(promotion.productActivation),
      );

      // Check if discount is activated (used when discount is not limited to qty)
      let [discountActivated, discountApplied] = [false, false];
      for (const sku of checkoutItemsSku) {
        const activationIdx = promotion.productActivation.findIndex(
          (rule) => rule.product.sku === sku,
        );

        // Found product that is included in product activation
        if (activationIdx !== -1) {
          groupMatchDiscount[sku] += 1;

          // When a product discount's quantity is set to zero it should
          // apply to all products
          const applyDiscountToAllProducts = promotion.productDiscount.some(
            (rule) => rule.product.sku === sku && rule.quantity === 0,
          );

          console.log(
            `does discount apply to all products? ${applyDiscountToAllProducts}`,
          );

          // Subtract product activation quantity to determine when promotion should activate
          if (
            !discountActivated &&
            promotion.productActivation[activationIdx].quantity !== 0
          ) {
            promotion.productActivation[activationIdx].quantity -= 1;
          }
          discountActivated = promotion.productActivation.every(
            (rule) => rule.quantity === 0,
          );

          console.log(`discount is activated? ${discountActivated} for ${sku}`);

          // When discount is activated and doesn't apply to all products
          // it should calculate the discount for every product in discount rule
          if (discountActivated && !applyDiscountToAllProducts) {
            for (const discountRule of promotion.productDiscount) {
              // TODO: move to utility function
              let discountQuantity = discountRule.quantity;
              console.log(`checkout included ${checkoutItems.length} items`);
              // Remove from checkout list the items in discount rule
              // They'll be grouped into a single item w/ discount
              while (discountQuantity !== 0) {
                const itemIdx = checkoutItems.findIndex(
                  (item) => item.sku === discountRule.product.sku,
                );
                if (itemIdx !== -1) {
                  const tempCheckout = checkoutItems;
                  tempCheckout.splice(itemIdx, 1);
                  checkoutItems = tempCheckout;
                } else {
                  throw new Error(
                    'Attempting to calculate discount for item not included in checkout list',
                  );
                }
                discountQuantity -= 1;
              }

              console.log(
                `checkout now includes ${checkoutItems.length} items`,
              );

              const newProductWithDiscount = new Product();
              const groupedItemsDiscountNewSKU =
                groupedItemsDiscountNewSKUs.shift();
              newProductWithDiscount.name = `Discount_applied_${groupedItemsDiscountNewSKU}`;
              newProductWithDiscount.sku = groupedItemsDiscountNewSKU;
              newProductWithDiscount.price =
                discountRule.quantity *
                discountRule.product.price *
                (1 - discountRule.discount);

              console.log(
                `added discount product with price ${newProductWithDiscount.price}`,
              );

              console.log(
                `original product activation qty ${originalProductActivation[0].quantity}`,
              );

              checkoutItems.push(newProductWithDiscount);

              discountApplied = true;
              discountActivated = false;
              const tempOriginalActivation = JSON.parse(
                JSON.stringify(originalProductActivation),
              );
              promotion.productActivation = tempOriginalActivation;
            }
          }
        }
      }
      if (discountActivated && !discountApplied) {
        for (const [sku, productQuantity] of Object.entries(
          groupMatchDiscount,
        )) {
          if (productQuantity === 0) {
            continue;
          }
          // TODO: move to utility function
          let discountQuantity = productQuantity;
          // Remove from checkout list the items in group match
          // They'll be grouped into a single item w/ discount
          while (discountQuantity !== 0) {
            const itemIdx = checkoutItems.findIndex((item) => item.sku === sku);
            if (itemIdx !== -1) {
              const tempCheckout = checkoutItems;
              tempCheckout.splice(itemIdx, 1);
              checkoutItems = tempCheckout;
            } else {
              throw new Error(
                'Attempting to calculate discount for item not included in checkout list',
              );
            }
            discountQuantity -= 1;
          }
          const promotionDiscount = promotion.productDiscount.find(
            (rule) => rule.product.sku === sku,
          );
          const newProductWithDiscount = new Product();
          const groupedItemsDiscountNewSKU =
            groupedItemsDiscountNewSKUs.shift();
          newProductWithDiscount.name = `Discount_applied_${groupedItemsDiscountNewSKU}`;
          newProductWithDiscount.sku = groupedItemsDiscountNewSKU;
          newProductWithDiscount.price =
            productQuantity *
            promotionDiscount.product.price *
            (1 - promotionDiscount.discount);
          checkoutItems.push(newProductWithDiscount);

          discountApplied = true;
          discountActivated = false;
          const tempOriginalActivation = JSON.parse(
            JSON.stringify(originalProductActivation),
          );
          promotion.productActivation = tempOriginalActivation;
        }
      }
    }

    // At last, calculate total sum of items prices in checkoutItems
    let total = 0;
    for (const item of checkoutItems) {
      total += item.price;
    }
    return +total.toFixed(2);
  }
}
