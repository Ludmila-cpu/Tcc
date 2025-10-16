const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = express.Router();

// Obter carrinho do usuário
router.get('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar carrinho', error: err.message });
    }
});

// Adicionar item ao carrinho
router.post('/add', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Produto não encontrado' });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        // Verificar se produto já está no carrinho
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Atualizar quantidade
            cart.items[existingItemIndex].quantity += quantity || 1;
        } else {
            // Adicionar novo item
            cart.items.push({
                product: productId,
                quantity: quantity || 1,
                price: product.price
            });
        }

        await cart.save();
        await cart.populate('items.product');
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao adicionar item', error: err.message });
    }
});

// Remover item do carrinho
router.delete('/remove/:productId', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ msg: 'Carrinho não encontrado' });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao remover item', error: err.message });
    }
});

// Atualizar quantidade de um item
router.put('/update/:productId', auth, async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ msg: 'Carrinho não encontrado' });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === req.params.productId
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        }

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao atualizar item', error: err.message });
    }
});

// Limpar carrinho
router.delete('/clear', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ msg: 'Carrinho limpo', cart });
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao limpar carrinho', error: err.message });
    }
});

module.exports = router;