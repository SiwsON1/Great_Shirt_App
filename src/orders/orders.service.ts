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

  public async create(orderData): Promise<Order> {
    const { orderItems, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          orderItems: {
            create: orderItems, // Używamy "create" tutaj!
          },
        },
        include: {
          orderItems: {
            include: { product: true },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new ConflictException("Product doesn't exist");
      throw error;
    }
  }
}
