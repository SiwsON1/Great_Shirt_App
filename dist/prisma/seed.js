"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
function getProducts() {
    return [
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17220',
            name: 'T-shirt Basic',
            price: 45,
            rating: 5,
            image: 'Tshirt.jpg',
            imageTop: 'white_front.png',
            imageBottom: 'white_back.png',
            imageLeft: 'white_left.png',
            imageRight: 'white_right.png',
            description: 'Example description for Tshirt1',
            type: 'T-shirt',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17221',
            name: 'T-shirt Premium Black',
            price: 45,
            rating: 5,
            image: 'Tshirt_black.jpg',
            imageTop: 'black_front.png',
            imageBottom: 'black_back.png',
            imageLeft: 'black_left.png',
            imageRight: 'black_right.png',
            description: 'Example description for Tshirt',
            type: 'T-shirt',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17222',
            name: 'T-shirt Premium White',
            price: 235,
            rating: 5,
            image: 't5.jpg',
            imageTop: 'white_front.png',
            imageBottom: 'white_back.png',
            imageLeft: 'white_left.png',
            imageRight: 'white_right.png',
            description: 'Example description for Tshirt',
            type: 'T-shirt',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17223',
            name: 'Cap',
            price: 40,
            rating: 2,
            image: 'Cap_white.jpg',
            imageTop: 'cap_top.png',
            imageBottom: 'cap_bottom.png',
            imageLeft: 'cap_left.png',
            imageRight: 'cap_right.png',
            description: 'Example description for Tshirt',
            type: 'Cap',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
        {
            id: 'sd105551-0f0d-4a9f-bc41-c559c8a17221',
            name: 'T-shirt 5',
            price: 32,
            rating: 3,
            image: 't2.jpg',
            imageTop: 'white_front.png',
            imageBottom: 'white_back.png',
            imageLeft: 'white_left.png',
            imageRight: 'white_right.png',
            description: 'Example description for Tshirt',
            type: 'T-shirt',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
        {
            id: 'sa105551-0f0d-4a9f-bc41-c559c8a17134',
            name: 'T-shirt 6',
            price: 80,
            rating: 5,
            image: 't3.jpg',
            imageTop: 'white_front.png',
            imageBottom: 'white_back.png',
            imageLeft: 'white_left.png',
            imageRight: 'white_right.png',
            description: 'Example description for Tshirt',
            type: 'T-shirt',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
        {
            id: 'bd105559-0f0d-4a9f-bc41-c559c8a17221',
            name: 'T-shirt 7',
            price: 120,
            rating: 4,
            image: 'Tshirt_black_premium.jpg',
            imageTop: 'black_front.png',
            imageBottom: 'black_back.png',
            imageLeft: 'black_left.png',
            imageRight: 'black_right.png',
            description: 'Example description for Tshirt',
            type: 'T-shirt',
            color: 'white',
            material: 'cotton',
            brand: 'Nike',
        },
    ];
}
async function seed() {
    await Promise.all(getProducts().map((product) => {
        return db.product.create({ data: product });
    }));
}
seed();
//# sourceMappingURL=seed.js.map