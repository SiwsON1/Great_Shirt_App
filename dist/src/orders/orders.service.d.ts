import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
export declare class OrdersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<Order[]>;
    getById(orderId: Order['orderId']): Promise<Order | null>;
    create(orderData: any): Promise<Order>;
}
