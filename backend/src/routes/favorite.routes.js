const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get Favorites
router.get('/:userId', async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.params.userId },
            include: { product: true }
        });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle Favorite
router.post('/toggle', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const existing = await prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });

        if (existing) {
            await prisma.favorite.delete({ where: { id: existing.id } });
            res.json({ message: 'Removed from favorites', added: false });
        } else {
            await prisma.favorite.create({
                data: { userId, productId }
            });
            res.json({ message: 'Added to favorites', added: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
