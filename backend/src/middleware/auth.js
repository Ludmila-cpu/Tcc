const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Verificar se o header existe
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                msg: 'Acesso negado. Token não fornecido.' 
            });
        }

        // Extrair token
        const token = authHeader.replace('Bearer ', '');
        
        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_jwt_secret');

        // Buscar usuário
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(401).json({ 
                success: false,
                msg: 'Token inválido. Usuário não encontrado.' 
            });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                msg: 'Token inválido.' 
            });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                msg: 'Token expirado. Faça login novamente.' 
            });
        }
        res.status(401).json({ 
            success: false,
            msg: 'Falha na autenticação.' 
        });
    }
};

module.exports = auth;