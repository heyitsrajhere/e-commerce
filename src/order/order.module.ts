import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/db/entity/orders.entity';
import { OrderItems } from 'src/db/entity/order-items.entity';
import { Products } from 'src/db/entity/products.entity';
import { User } from 'src/db/entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderItems,Products,User])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
