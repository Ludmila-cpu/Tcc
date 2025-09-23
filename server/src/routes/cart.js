const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Modelo temporário do carrinho (você pode criar um modelo próprio depois)
const carts = new Map();

// Obter carrinho do usuário
router.get('/', auth, (req, res) => {
    try {
        const cart = carts.get(req.user._id.toString()) || [];
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar carrinho' });
    }
});

// Adicionar item ao carrinho
router.post('/add', auth, (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = carts.get(userId) || [];
        cart.push(req.body);
        carts.set(userId, cart);
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao adicionar item' });
    }
});

// Remover item do carrinho
router.delete('/remove/:id', auth, (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = carts.get(userId) || [];
        const newCart = cart.filter(item => item.id !== req.params.id);
        carts.set(userId, newCart);
        res.json(newCart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao remover item' });
    }
});

// Atualizar quantidade de um item
router.put('/update/:id', auth, (req, res) => {
    try {
        const userId = req.user._id.toString();
        const cart = carts.get(userId) || [];
        const itemIndex = cart.findIndex(item => item.id === req.params.id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = req.body.quantity;
            carts.set(userId, cart);
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao atualizar item' });
    }
});

// Limpar carrinho
router.delete('/clear', auth, (req, res) => {
    try {
        const userId = req.user._id.toString();
        carts.delete(userId);
        res.json({ msg: 'Carrinho limpo' });
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao limpar carrinho' });
    }
});

module.exports = router;