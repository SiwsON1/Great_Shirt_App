import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17220',
      name: 'T-shirt 1',
      price: 45,
      rating: 5,
      image: 'Tshirt.jpg',
      description: 'Example description for Tshirt1',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17221',
      name: 'T-shirt 2',
      price: 45,
      rating: 5,
      image: 'laptop.jpg',
      description: 'Example description for Tshirt',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17222',
      name: 'T-shirt 3',
      price: 235,
      rating: 5,
      image: 'laptop.jpg',
      description: 'Example description for Tshirt',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17223',
      name: 'T-shirt 4',
      price: 40,
      rating: 2,
      image: 'phone.jpg',
      description: 'Example description for Tshirt',
    },
    {
      id: 'sd105551-0f0d-4a9f-bc41-c559c8a17221',
      name: 'T-shirt 5',
      price: 32,
      rating: 3,
      image: 'laptop.jpg',
      description: 'Example description for Tshirt',
    },
    {
      id: 'sa105551-0f0d-4a9f-bc41-c559c8a17134',
      name: 'T-shirt 6',
      price: 80,
      rating: 5,
      image: 'phone.jpg',
      description: 'Example description for Tshirt',
    },
    {
      id: 'bd105559-0f0d-4a9f-bc41-c559c8a17221',
      name: 'T-shirt 7',
      price: 120,
      rating: 4,
      image: 'phone.jpg',
      description: 'Example description for Tshirt',
    },
  ];
}

function getOrders() {
  return [
    {
      orderId: '01c7599d-318b-4b9f-baf7-51f3a936a1d0',
      productId: 'bd105559-0f0d-4a9f-bc41-c559c8a17221',
      amount: 100,
      email: 'RonaldMcdonald@example.com',
      name: 'Ronald Mcdonald',
      address: 'Baker Street 12B, New York',
      payment: 'cash',
      delivery: 'personal-collection',
    },
    {
      orderId: '01c7599d-318b-4b9f-baf7-51f3a936a1d1',
      productId: 'sa105551-0f0d-4a9f-bc41-c559c8a17134',
      amount: 120,
      email: 'JohnDoese@example.com',
      name: 'Donald Mcronald',
      address: '14th Street, New York',
      payment: 'card',
      delivery: 'UPS',
    },
    {
      orderId: '01c7599d-318b-4b9f-baf7-51f3a936a1d2',
      productId: 'sd105551-0f0d-4a9f-bc41-c559c8a17221',
      amount: 90,
      email: 'DoeJoe@example.com',
      name: 'Ronaldo Mcdonaldo',
      address: '123 Main Street, London',
      payment: 'paypal',
      delivery: 'DHL',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
        },
      });
    }),
  );
}

seed();
