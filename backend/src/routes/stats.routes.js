const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const userCount = await prisma.user.count();
        const productCount = await prisma.product.count();
        const cartCount = await prisma.cart.count();
        // const orderCount = await prisma.order.count(); // Future implementation

        res.json({
            users: userCount,
            products: productCount,
            carts: cartCount,
            revenue: cartCount * 125 // Mock revenue
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
