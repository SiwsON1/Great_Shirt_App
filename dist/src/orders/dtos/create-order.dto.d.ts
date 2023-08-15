export declare class OrderItemDTO {
    productId: string;
    quantity: number;
}
export declare class OrderDTO {
    amount: number;
    email: string;
    name: string;
    address: string;
    payment: string;
    delivery: string;
    orderItems: OrderItemDTO[];
}
