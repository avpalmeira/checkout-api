import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { PromotionActivationRule } from './entities/promotion-activation-rule.entity';
import { PromotionDiscountRule } from './entities/promotion-discount-rule.entity';

import { instanceToPlain } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionActivationRule)
    private readonly promotionActivationRepository: Repository<PromotionActivationRule>,
    @InjectRepository(PromotionDiscountRule)
    private readonly promotionDiscountRepository: Repository<PromotionDiscountRule>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    @Body() createPromotionDto: CreatePromotionDTO,
  ): Promise<Promotion> {
    const { productActivation, productDiscount } = createPromotionDto;

    const promotion = new Promotion();
    promotion.productActivation = [];
    promotion.productDiscount = [];

    // TODO: move it to utility function
    for (const activationRule of productActivation) {
      if (activationRule.quantity <= 0) {
        throw new Error(
          `Product quantity for SKU ${activationRule.productSku} must be greater than zero.`,
        );
      }
      const product = await this.productRepository.findOne({
        where: { sku: activationRule.productSku },
      });

      if (!product) {
        throw new Error(
          `Product with SKU ${activationRule.productSku} not found`,
        );
      }

      const rule = new PromotionActivationRule();
      rule.quantity = activationRule.quantity;
      rule.product = product;
      rule.promotion = promotion;
      const plainRule = instanceToPlain(rule);

      promotion.productActivation.push(plainRule as PromotionActivationRule);
    }

    // TODO: move it to utility function
    for (const discountRule of productDiscount) {
      if (discountRule.quantity < 0) {
        throw new Error(
          `Product quantity for SKU ${discountRule.productSku} must be positive.`,
        );
      }
      const product = await this.productRepository.findOne({
        where: { sku: discountRule.productSku },
      });

      if (!product) {
        throw new Error(
          `Product with SKU ${discountRule.productSku} not found`,
        );
      }

      const rule = new PromotionDiscountRule();
      rule.quantity = discountRule.quantity;
      rule.discount = discountRule.discount;
      rule.product = product;
      rule.promotion = promotion;
      const plainRule = instanceToPlain(rule);

      promotion.productDiscount.push(plainRule as PromotionDiscountRule);
    }
    return this.promotionRepository.save(promotion);
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find();
  }

  async findOne(id: number): Promise<Promotion | null> {
    return this.promotionRepository.findOneBy({ id });
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const promotion = await this.findOne(id);

    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} was not found`);
    }
    for (const productActivation of promotion.productActivation) {
      await this.promotionActivationRepository.delete(productActivation.id);
    }
    for (const productDiscount of promotion.productDiscount) {
      await this.promotionDiscountRepository.delete(productDiscount.id);
    }
    await this.promotionRepository.delete(id);
  }
}
