const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: req.params.id } });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Product (Admin Only - simplified checks for now, ideally needs middleware)
router.post('/', async (req, res) => {
    try {
        const { name, description, price, imageUrl, category, stock } = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                category,
                stock: parseInt(stock)
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, imageUrl, category, stock } = req.body;
        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: {
                name,
                description,
                price: price ? parseFloat(price) : undefined,
                imageUrl,
                category,
                stock: stock ? parseInt(stock) : undefined
            }
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
