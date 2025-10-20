const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Registro
router.post('/register', [
    check('name', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Email inválido').isEmail(),
    check('password', 'Senha deve ter no mínimo 6 caracteres').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        user = new User({
            name,
            email,
            password
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'seu_jwt_secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// Login
router.post('/login', [
    check('email', 'Email inválido').isEmail(),
    check('password', 'Senha é obrigatória').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'seu_jwt_secret',
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// Obter perfil do usuário autenticado
router.get('/me', require('../middleware/auth'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json({
            success: true,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro ao buscar perfil' });
    }
});

// Atualizar perfil do usuário
router.put('/profile', require('../middleware/auth'), [
    check('name', 'Nome é obrigatório').optional().not().isEmpty(),
    check('email', 'Email inválido').optional().isEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, address } = req.body;
        const updateFields = {};

        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (address) updateFields.address = address;

        // Verificar se email já está em uso por outro usuário
        if (email && email !== req.user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ msg: 'Email já está em uso' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateFields,
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro ao atualizar perfil' });
    }
});

module.exports = router;