import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from './promotion.entity';
import { Product } from '../../product/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity('promotion_activation_rules')
export class PromotionActivationRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.productActivation)
  @Exclude({ toPlainOnly: true })
  promotion: Promotion;
}
