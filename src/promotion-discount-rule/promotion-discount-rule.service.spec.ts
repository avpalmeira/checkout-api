import { Test, TestingModule } from '@nestjs/testing';
import { PromotionDiscountRuleService } from './promotion-discount-rule.service';

describe('PromotionDiscountRuleService', () => {
  let service: PromotionDiscountRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionDiscountRuleService],
    }).compile();

    service = module.get<PromotionDiscountRuleService>(PromotionDiscountRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
