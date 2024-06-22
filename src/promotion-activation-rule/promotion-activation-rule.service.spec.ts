import { Test, TestingModule } from '@nestjs/testing';
import { PromotionActivationRuleService } from './promotion-activation-rule.service';

describe('PromotionActivationRuleService', () => {
  let service: PromotionActivationRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionActivationRuleService],
    }).compile();

    service = module.get<PromotionActivationRuleService>(PromotionActivationRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
