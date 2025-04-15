import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

import { DataSource } from 'typeorm';
import { User } from './db/entity/user.entity';
import { Order } from './db/entity/orders.entity';
import { Products } from './db/entity/products.entity';
import { OrderItems } from './db/entity/order-items.entity';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'commerce',
      entities: [User, Order, Products, OrderItems],
      synchronize: true, // Set to false in production
    }),
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
