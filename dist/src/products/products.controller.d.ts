import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): any;
    getById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        rating: number;
        image: string;
        imageTop: string;
        imageBottom: string;
        imageLeft: string;
        imageRight: string;
        description: string;
        type: string;
        color: string;
        material: string;
        brand: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
