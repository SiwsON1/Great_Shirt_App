import { OrdersService } from './orders.service';
import { OrderDTO } from './dtos/create-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(): Promise<{
        orderId: string;
        amount: number;
        email: string;
        name: string;
        address: string;
        payment: string;
        delivery: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        orderId: string;
        amount: number;
        email: string;
        name: string;
        address: string;
        payment: string;
        delivery: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(orderData: OrderDTO): Promise<{
        orderId: string;
        amount: number;
        email: string;
        name: string;
        address: string;
        payment: string;
        delivery: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
