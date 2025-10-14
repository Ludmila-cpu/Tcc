const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const router = express.Router();

// Criar novo pedido a partir do carrinho
router.post('/', auth, async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        // Buscar carrinho do usuário
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ msg: 'Carrinho vazio' });
        }

        // Criar pedido
        const order = new Order({
            user: req.user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalPrice: cart.totalPrice,
            shippingAddress,
            paymentMethod
        });

        await order.save();

        // Limpar carrinho após criar pedido
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao criar pedido', error: err.message });
    }
});

// Listar pedidos do usuário
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedidos', error: err.message });
    }
});

// Buscar pedido específico
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate('items.product');

        if (!order) {
            return res.status(404).json({ msg: 'Pedido não encontrado' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedido', error: err.message });
    }
});

// Atualizar status do pedido (admin)
router.put('/:id/status', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Acesso negado' });
        }

        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('items.product');

        if (!order) {
            return res.status(404).json({ msg: 'Pedido não encontrado' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao atualizar status', error: err.message });
    }
});

// Listar todos os pedidos (admin)
router.get('/admin/all', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Acesso negado' });
        }

        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedidos', error: err.message });
    }
});

module.exports = router;