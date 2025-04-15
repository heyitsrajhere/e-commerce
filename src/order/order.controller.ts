import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { UpdateOrderItemStatusDto } from './dto/update-order.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/Guard/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('create')
  create(@Body() body: PlaceOrderDto, @Param('userId') userId: number) {
    return this.orderService.placeOrder(body, userId);
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard)
  updateOrderStatus(
    @Param('id') id: number,
    @Body() dto: UpdateOrderItemStatusDto,
  ) {
    return this.orderService.updateOrderStatus(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  deleteOrder(
    @Param('id') id: number,
  ) {
    return this.orderService.deleteOrder(id);
  }
}
