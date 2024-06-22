import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from '../../promotion/entities/promotion.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class PromotionActivationRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.productActivation)
  promotion: Promotion;
}
