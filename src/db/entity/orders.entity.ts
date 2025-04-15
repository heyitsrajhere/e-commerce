import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { OrderItems } from './order-items.entity';

@Entity('order') // Table name in the database
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order, { cascade: true, eager: true })
  orderItems: OrderItems[];

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
