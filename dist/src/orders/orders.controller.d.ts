import { OrdersService } from './orders.service';
import { OrderDTO } from './dtos/create-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        orderId: string;
        amount: number;
        email: string;
        name: string;
        address: string;
        payment: string;
        delivery: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getById(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        orderId: string;
        amount: number;
        email: string;
        name: string;
        address: string;
        payment: string;
        delivery: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    create(orderData: OrderDTO): Promise<import("@prisma/client/runtime").GetResult<{
        orderId: string;
        amount: number;
        email: string;
        name: string;
        address: string;
        payment: string;
        delivery: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
