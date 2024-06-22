import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PromotionActivationRule } from './promotion-activation-rule.entity';
import { PromotionDiscountRule } from './promotion-discount-rule.entity';

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PromotionActivationRule, (rule) => rule.promotion, {
    cascade: true,
    eager: true,
  })
  productActivation: PromotionActivationRule[];

  @OneToMany(() => PromotionDiscountRule, (rule) => rule.promotion, {
    cascade: true,
    eager: true,
  })
  productDiscount: PromotionDiscountRule[];
}
