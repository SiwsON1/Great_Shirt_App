import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({});
  }

  public getById(orderId: Order['orderId']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: {
        orderId,
      },
    });
  }

  public async create(
    orderData: Omit<Order, 'orderId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    console.log(orderData);
    try {
      return await this.prismaService.order.create({
        data: orderData,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Order already exist');
      }
    }
  }
}
