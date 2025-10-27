# Vereco Backend

API RESTful para o e-commerce Vereco.

## 🚀 Deploy na Vercel

Para fazer deploy, consulte: [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md)

## 📦 Instalação Local

```bash
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
MONGODB_URI=sua_connection_string_mongodb
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
PORT=5000
```

## 🏃 Executar

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start

# Popular banco de dados
npm run seed
```

## 📚 Documentação

Toda a documentação está em [docs/](docs/):

- [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) - Documentação completa da API
- [INSTALACAO_RAPIDA.md](docs/INSTALACAO_RAPIDA.md) - Guia rápido de instalação
- [DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md) - Deploy na Vercel

## 🔗 Endpoints Principais

- `GET /health` - Health check
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/products` - Listar produtos
- `GET /api/cart` - Carrinho do usuário
- `POST /api/orders` - Criar pedido

## 🛠️ Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticação
- Bcrypt para hash de senhas
