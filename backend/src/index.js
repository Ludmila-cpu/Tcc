require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Rotas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

// Middlewares personalizados
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Segurança - Helmet
app.use(helmet());

// Logging - Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Rate Limiting - Limitar requisições
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
    message: 'Muitas requisições deste IP, tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate Limiting específico para autenticação (mais restritivo)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: process.env.NODE_ENV !== 'production' ? 1000 : 5, // relaxa no dev
    message: 'Muitas tentativas de login/registro. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Aplicar rate limiting global
app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// CORS
const envOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const defaultOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:8000', 'http://127.0.0.1:5500', 'http://localhost:5500'];
const staticProdOrigins = ['https://vereco-tcc.vercel.app'];
const allowedOrigins = new Set([...envOrigins, ...defaultOrigins, ...staticProdOrigins]);

function isOriginAllowed(origin) {
    if (allowedOrigins.has(origin)) return true;
    // Permitir deploys de preview do Vercel do front (ex.: https://vereco-tcc-<hash>-<user>.vercel.app)
    // Ex.: https://vereco-tcc-git-main-usuario.vercel.app ou https://vereco-tcc-abc123.vercel.app
    const vercelPreviewRegex = /^https?:\/\/vereco-tcc-[a-z0-9-]+\.vercel\.app$/i;
    if (vercelPreviewRegex.test(origin)) return true;
    return false;
}

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir requisições sem origin (mobile apps, Postman, etc)
        if (!origin) return callback(null, true);

        // Em desenvolvimento, liberar qualquer origem local para evitar "Failed to fetch"
        if (process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }

        if (isOriginAllowed(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS não permitido para esta origem'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length']
};

app.use(cors(corsOptions));
// Responder preflight rapidamente
app.options('*', cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vereco', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✓ Conectado ao MongoDB'))
    .catch(err => console.error('✗ Erro ao conectar ao MongoDB:', err));

// Rota de teste
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Vereco funcionando!',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            cart: '/api/cart',
            orders: '/api/orders'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Middleware de rota não encontrada
app.use(notFound);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✓ Servidor rodando na porta ${PORT}`);
        console.log(`✓ Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
}

// Exportar para Vercel serverless
module.exports = app;