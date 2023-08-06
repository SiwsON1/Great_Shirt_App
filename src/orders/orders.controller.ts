import {
  Controller,
  Get,
  Post,
  Body,
  ParseUUIDPipe,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  async getAll() {
    return await this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  create(@Body() orderData: OrderDTO) {
    return this.ordersService.create(orderData);
  }
}
