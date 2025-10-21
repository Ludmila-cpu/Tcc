const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// Listar todos os produtos com filtros e paginação
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            search, 
            minPrice, 
            maxPrice, 
            page = 1, 
            limit = 10,
            sort = 'createdAt'
        } = req.query;

        // Construir filtros
        const filters = {};
        
        if (category) {
            filters.category = category;
        }

        if (search) {
            filters.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = Number(minPrice);
            if (maxPrice) filters.price.$lte = Number(maxPrice);
        }

        // Paginação
        const skip = (Number(page) - 1) * Number(limit);

        // Buscar produtos
        const products = await Product.find(filters)
            .sort(sort)
            .limit(Number(limit))
            .skip(skip);

        // Total de produtos
        const total = await Product.countDocuments(filters);

        res.json({
            success: true,
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalProducts: total,
                limit: Number(limit)
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro ao buscar produtos' });
    }
});

// Buscar produto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar produto' });
    }
});

// Criar produto (requer autenticação de admin)
router.post('/', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Acesso negado' });
        }
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao criar produto' });
    }
});

// Atualizar produto (requer autenticação de admin)
router.put('/:id', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Acesso negado' });
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ msg: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao atualizar produto' });
    }
});

// Deletar produto (requer autenticação de admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Acesso negado' });
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Produto não encontrado' });
        }
        res.json({ msg: 'Produto removido' });
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao deletar produto' });
    }
});

module.exports = router;