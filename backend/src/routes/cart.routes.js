const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get Cart
router.get('/:userId', async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.params.userId },
            include: { items: { include: { product: true } } }
        });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Item to Cart
router.post('/add', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find cart
        let cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await prisma.cart.create({ data: { userId } });
        }

        // Check if item exists
        const existingItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId }
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + (quantity || 1) }
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity: quantity || 1
                }
            });
        }

        const updatedCart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } }
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove Item from Cart
router.delete('/item/:itemId', async (req, res) => {
    try {
        await prisma.cartItem.delete({ where: { id: req.params.itemId } });
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
