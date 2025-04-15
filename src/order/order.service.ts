

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceOrderDto } from './dto/place-order.dto';
import { UpdateOrderItemStatusDto } from './dto/update-order.dto';
import { OrderStatus } from 'src/Enums/update-status.dto';
import { OrderItems } from 'src/db/entity/order-items.entity';
import { Order } from 'src/db/entity/orders.entity';
import { Products } from 'src/db/entity/products.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItems)
    private orderItemsRepo: Repository<OrderItems>,
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) {}

  /**
   * this api will return placed order
   * @param dto name , price, description, quantity
   * @param userId
   * @returns placed order will return
   */
  async placeOrder(dto: PlaceOrderDto, userId: number) {
    const order = this.orderRepo.create({
      user: { id: userId },
      status: 'pending',
    });
    const item: OrderItems[] = [];
    for (const i of dto.items) {
      const product = await this.productRepo.findOne({ where: { id: i.id } });
      if (!product) throw new Error('Product not found');
      const orderItem = this.orderItemsRepo.create({
        product: product,
        quantity: i.quantity,
        order: order,
      });
      item.push(orderItem);
    }
    order.orderItems = await this.orderItemsRepo.save(item);
    return await this.orderRepo.save(order);
  }

  /**
   * Get all orders for all users
   * @returns all orders in database
   */
  getAllOrders() {
    return this.orderRepo.find({
      relations: { orderItems: { product: true } },
    });
  }

  /**
   * Update status of order
   * @param id orderId
   * @param dto Enums
   */
  async updateOrderStatus(id: number, dto: UpdateOrderItemStatusDto) {
    const orders = await this.orderRepo.findOne({
      where: { id },
      relations: ['User'],
    });
    if (!orders) throw new Error('Order not found');
    if (orders.user.id !== id)
      throw new Error('You are not authorized to change this order status');
    if (orders.status === dto.status)
      throw new Error('Order status already updated');
    await this.orderRepo.save(orders);
  }

  /**
   * Order delete by id before shipment
   * @param id  of order
   * @returns message
   */
  async deleteOrder(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new Error('Order not found');
    if (order.status === OrderStatus.COMPLETED) {
      throw new Error('Cannot delete a completed order');
    }
    await this.orderRepo.delete(id);
    return { message: 'Order deleted successfully' };
  }
}
