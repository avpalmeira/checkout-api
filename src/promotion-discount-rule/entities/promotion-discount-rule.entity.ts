import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from '../../promotion/entities/promotion.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class PromotionDiscountRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal')
  discount: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.productActivation)
  promotion: Promotion;
}
