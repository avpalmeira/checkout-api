import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PromotionActivationRule } from '../../promotion-activation-rule/entities/promotion-activation-rule.entity';
import { PromotionDiscountRule } from '../../promotion-discount-rule/entities/promotion-discount-rule.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PromotionActivationRule, (rule) => rule.promotion, {
    cascade: true,
  })
  productActivation: PromotionActivationRule[];

  @OneToMany(() => PromotionDiscountRule, (rule) => rule.promotion, {
    cascade: true,
  })
  productDiscount: PromotionDiscountRule[];
}
