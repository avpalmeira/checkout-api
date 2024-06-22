import { Injectable } from '@nestjs/common';
import { CreatePromotionDiscountRuleDto } from './dto/create-promotion-discount-rule.dto';
import { UpdatePromotionDiscountRuleDto } from './dto/update-promotion-discount-rule.dto';

@Injectable()
export class PromotionDiscountRuleService {
  create(createPromotionDiscountRuleDto: CreatePromotionDiscountRuleDto) {
    return 'This action adds a new promotionDiscountRule';
  }

  findAll() {
    return `This action returns all promotionDiscountRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionDiscountRule`;
  }

  update(id: number, updatePromotionDiscountRuleDto: UpdatePromotionDiscountRuleDto) {
    return `This action updates a #${id} promotionDiscountRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionDiscountRule`;
  }
}
