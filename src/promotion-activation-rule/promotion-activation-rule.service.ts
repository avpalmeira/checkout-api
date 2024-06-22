import { Injectable } from '@nestjs/common';
import { CreatePromotionActivationRuleDto } from './dto/create-promotion-activation-rule.dto';
import { UpdatePromotionActivationRuleDto } from './dto/update-promotion-activation-rule.dto';

@Injectable()
export class PromotionActivationRuleService {
  create(createPromotionActivationRuleDto: CreatePromotionActivationRuleDto) {
    return 'This action adds a new promotionActivationRule';
  }

  findAll() {
    return `This action returns all promotionActivationRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionActivationRule`;
  }

  update(id: number, updatePromotionActivationRuleDto: UpdatePromotionActivationRuleDto) {
    return `This action updates a #${id} promotionActivationRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionActivationRule`;
  }
}
