import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { getProductMock, getPromotionMock } from '../testUtils';
import { ProductService } from '../product/product.service';
import { PromotionService } from '../promotion/promotion.service';

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  const productService = { findOne: getProductMock };
  const promotionService = { findAll: () => [getPromotionMock()] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutService, ProductService, PromotionService],
    })
      .overrideProvider(ProductService)
      .useValue(productService)
      .overrideProvider(PromotionService)
      .useValue(promotionService)
      .compile();

    checkoutService = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(checkoutService).toBeDefined();
  });

  it('should calculate the total price of products in the checkout', async () => {
    const productMock = getProductMock();
    const promotionMock = getPromotionMock();
    const input = { products: [productMock.sku] };
    const result =
      productMock.price * (1 - promotionMock.productDiscount[0].discount);
    expect(await checkoutService.calculate(input)).toEqual(result);
  });
});
