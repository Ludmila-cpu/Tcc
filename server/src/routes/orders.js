const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Modelo temporário de pedidos (você pode criar um modelo próprio depois)
const orders = new Map();

// Criar novo pedido
router.post('/', auth, (req, res) => {
    try {
        const userId = req.user._id.toString();
        const userOrders = orders.get(userId) || [];
        const newOrder = {
            id: Date.now().toString(),
            items: req.body.items,
            total: req.body.total,
            status: 'pending',
            createdAt: new Date()
        };
        userOrders.push(newOrder);
        orders.set(userId, userOrders);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao criar pedido' });
    }
});

// Listar pedidos do usuário
router.get('/', auth, (req, res) => {
    try {
        const userOrders = orders.get(req.user._id.toString()) || [];
        res.json(userOrders);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedidos' });
    }
});

// Buscar pedido específico
router.get('/:id', auth, (req, res) => {
    try {
        const userOrders = orders.get(req.user._id.toString()) || [];
        const order = userOrders.find(o => o.id === req.params.id);
        if (!order) {
            return res.status(404).json({ msg: 'Pedido não encontrado' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar pedido' });
    }
});

// Atualizar status do pedido (admin)
router.put('/:id/status', auth, (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Acesso negado' });
        }
        const { userId, status } = req.body;
        const userOrders = orders.get(userId) || [];
        const orderIndex = userOrders.findIndex(o => o.id === req.params.id);
        if (orderIndex === -1) {
            return res.status(404).json({ msg: 'Pedido não encontrado' });
        }
        userOrders[orderIndex].status = status;
        orders.set(userId, userOrders);
        res.json(userOrders[orderIndex]);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao atualizar status' });
    }
});

module.exports = router;