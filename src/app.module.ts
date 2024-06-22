import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { CheckoutModule } from './checkout/checkout.module';

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
    CheckoutModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
