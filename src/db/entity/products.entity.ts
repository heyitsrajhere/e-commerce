import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItems } from './order-items.entity';

@Entity('products') // Table name in the database
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  orderItems: OrderItems[];
}