import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from '../../promotion/entities/promotion.entity';
import { Product } from '../../product/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity('promotion_discount_rules')
export class PromotionDiscountRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  discount: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.productDiscount)
  @Exclude({ toPlainOnly: true })
  promotion: Promotion;
}
