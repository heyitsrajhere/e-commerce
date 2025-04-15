import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Products } from './products.entity';

@Entity('order_items') // Table name in the database
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Products, (product) => product.orderItems, { onDelete: 'CASCADE' })
  product: Products;
}
