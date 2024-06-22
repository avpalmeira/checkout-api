import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { PromotionActivationRuleModule } from './promotion-activation-rule/promotion-activation-rule.module';
import { PromotionDiscountRuleModule } from './promotion-discount-rule/promotion-discount-rule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'shopping_db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
    PromotionModule,
    PromotionActivationRuleModule,
    PromotionDiscountRuleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
