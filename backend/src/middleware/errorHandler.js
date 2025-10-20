// Middleware de tratamento de erros global
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);

    // Erro de validação do Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            msg: 'Erro de validação',
            errors
        });
    }

    // Erro de cast do Mongoose (ID inválido)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            msg: 'ID inválido'
        });
    }

    // Erro de chave duplicada do MongoDB
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            msg: `${field} já está em uso`
        });
    }

    // Erro de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            msg: 'Token inválido'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            msg: 'Token expirado'
        });
    }

    // Erro genérico
    res.status(err.statusCode || 500).json({
        success: false,
        msg: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Middleware para rotas não encontradas
const notFound = (req, res, next) => {
    const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

module.exports = { errorHandler, notFound };
