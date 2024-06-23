import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../testUtils';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let repositoryMock: MockType<Repository<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repositoryMock = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a product', async () => {
    const product = { sku: 'ABC123', name: 'product', price: 10 };
    repositoryMock.findOneBy.mockReturnValue(product);
    expect(await service.findOne(product.sku)).toEqual(product);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ sku: product.sku });
  });
});
