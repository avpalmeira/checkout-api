import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from './promotion.service';
import {
  MockType,
  getPromotionMock,
  repositoryMockFactory,
} from '../testUtils';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PromotionActivationRule } from './entities/promotion-activation-rule.entity';
import { PromotionDiscountRule } from './entities/promotion-discount-rule.entity';
import { Product } from '../product/entities/product.entity';

describe('PromotionService', () => {
  let service: PromotionService;
  let repositoryMock: MockType<Repository<Promotion>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionService,
        {
          provide: getRepositoryToken(Promotion),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(PromotionActivationRule),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(PromotionDiscountRule),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<PromotionService>(PromotionService);
    repositoryMock = module.get(getRepositoryToken(Promotion));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a promotion', async () => {
    const promotion = getPromotionMock();
    repositoryMock.findOneBy.mockReturnValue(promotion);
    expect(await service.findOne(promotion.id)).toEqual(promotion);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: promotion.id });
  });
});
