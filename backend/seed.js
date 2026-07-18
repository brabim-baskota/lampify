const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@lampify.com' },
        update: {},
        create: {
            email: 'admin@lampify.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            cart: {
                create: {} // Create empty cart
            }
        },
    });
    console.log({ admin });

    // Create Sample Products
    const products = [
        {
            name: 'Modern Desk Lamp',
            description: 'Sleek dark desk lamp with adjustable arm.',
            price: 45.00,
            imageUrl: 'https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&w=400&q=80',
            category: 'LAMP',
            stock: 10
        },
        {
            name: 'Vintage Edison Bulb',
            description: 'Warm glow vintage style LED bulb.',
            price: 12.50,
            imageUrl: 'https://images.unsplash.com/photo-1583847661884-37833cc26830?auto=format&fit=crop&w=400&q=80',
            category: 'BULB',
            stock: 50
        },
        {
            name: 'Minimalist Floor Lamp',
            description: 'Tall standing lamp for living room corners.',
            price: 120.00,
            imageUrl: 'https://images.unsplash.com/photo-1507473888900-52e1adad8d69?auto=format&fit=crop&w=400&q=80',
            category: 'LAMP',
            stock: 5
        }
    ];

    for (const p of products) {
        await prisma.product.create({ data: p });
    }
    console.log('Added sample products');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
