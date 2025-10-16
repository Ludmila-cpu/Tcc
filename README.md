# 🛒 Vereco - E-commerce de Produtos Orgânicos

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Node](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v7.0+-brightgreen)
![React](https://img.shields.io/badge/React-v19.1-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Segurança](#segurança)
- [Qualidade de Código](#qualidade-de-código)
- [Instalação e Configuração](#instalação-e-configuração)
- [Métricas do Projeto](#métricas-do-projeto)
- [Fluxo de Dados](#fluxo-de-dados)
- [API Endpoints](#api-endpoints)
- [Desenvolvedor](#desenvolvedor)

---

## 📖 Sobre o Projeto

**Vereco** é uma plataforma de e-commerce desenvolvida como Trabalho de Conclusão de Curso (TCC), especializada na venda de produtos orgânicos e naturais. O sistema oferece uma experiência completa de compra online, desde o cadastro de usuários até o processamento de pedidos.

### Objetivos

- Criar uma plataforma robusta e escalável para comércio eletrônico
- Implementar autenticação segura com JWT
- Desenvolver uma API RESTful completa
- Proporcionar interface responsiva e intuitiva
- Gerenciar catálogo de produtos, carrinho de compras e pedidos

---

## 🚀 Stack Tecnológica

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 19.1.1 | Biblioteca JavaScript para construção de interfaces |
| **React Router DOM** | 7.8.2 | Roteamento e navegação SPA |
| **TypeScript** | 5.9.2 | Superset JavaScript com tipagem estática |
| **Vite** | 7.1.4 | Build tool e dev server de alta performance |
| **Tailwind CSS** | 3.3.3 | Framework CSS utilitário |
| **PostCSS** | 8.4.31 | Ferramenta para transformação CSS |

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript server-side |
| **Express.js** | 4.18.2 | Framework web minimalista e flexível |
| **MongoDB** | 7.5.0 | Banco de dados NoSQL orientado a documentos |
| **Mongoose** | 7.5.0 | ODM (Object Data Modeling) para MongoDB |

### Segurança & Autenticação

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **bcryptjs** | 2.4.3 | Hashing de senhas com salt |
| **jsonwebtoken** | 9.0.1 | Geração e validação de JWT tokens |
| **express-validator** | 7.0.1 | Middleware de validação de entrada |
| **CORS** | 2.8.5 | Controle de acesso Cross-Origin |

### Desenvolvimento

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Nodemon** | 3.0.1 | Auto-reload do servidor em desenvolvimento |
| **dotenv** | 16.3.1 | Gerenciamento de variáveis de ambiente |
| **Multer** | 1.4.5 | Upload de arquivos multipart/form-data |

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura **Cliente-Servidor** com separação clara entre frontend e backend:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  React Pages │  │  Components  │  │   API Client │      │
│  │              │  │              │  │   (api.js)   │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
└─────────────────────────────────────────────┼──────────────┘
                                              │ HTTP/REST
                                              │ JSON
┌─────────────────────────────────────────────┼──────────────┐
│                     SERVIDOR (Backend)      │               │
│  ┌──────────────────────────────────────────▼──────┐       │
│  │            Express.js REST API                  │       │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │       │
│  │  │  Routes  │→ │Controllers│→ │Middleware│      │       │
│  │  └──────────┘  └──────────┘  └──────────┘      │       │
│  └──────────────────────┬──────────────────────────┘       │
│                         │ Mongoose ODM                      │
│  ┌──────────────────────▼──────────────────────────┐       │
│  │              MongoDB Database                   │       │
│  │  ┌────────┐ ┌────────┐ ┌──────┐ ┌───────┐      │       │
│  │  │ Users  │ │Products│ │ Carts│ │Orders │      │       │
│  │  └────────┘ └────────┘ └──────┘ └───────┘      │       │
│  └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Padrões de Projeto Utilizados

- **MVC (Model-View-Controller)**: Separação de responsabilidades no backend
- **Repository Pattern**: Abstração de acesso a dados via Mongoose Models
- **Middleware Pattern**: Autenticação, validação e tratamento de erros
- **SPA (Single Page Application)**: Navegação fluida com React Router
- **API RESTful**: Endpoints seguindo convenções REST

---

## 📁 Estrutura do Projeto

```
Tcc/
├── 📄 README.md                    # Documentação principal
├── 📄 package.json                 # Dependências frontend
├── 📄 vite.config.ts              # Configuração Vite
├── 📄 tailwind.config.js          # Configuração Tailwind CSS
├── 📄 tsconfig.json               # Configuração TypeScript
│
├── 📂 public/                      # Arquivos estáticos públicos
│
├── 📂 src/                         # Código fonte frontend
│   ├── 📄 main.tsx                # Entry point React
│   ├── 📄 App.tsx                 # Componente raiz
│   ├── 📄 index.css               # Estilos globais
│   ├── 📂 pages/                  # Páginas React
│   │   ├── LoginPage.tsx          # Página de login
│   │   ├── ProductsPage.tsx       # Catálogo de produtos
│   │   ├── CartPage.tsx           # Carrinho de compras
│   │   └── PaymentPage.tsx        # Checkout e pagamento
│   ├── 📂 components/             # Componentes reutilizáveis
│   └── 📂 assets/                 # Imagens, ícones, SVGs
│
├── 📂 HTML Pages (Legacy)/        # Páginas HTML estáticas
│   ├── index.html                 # Landing page
│   ├── login.html                 # Login estático
│   ├── cadastro.html              # Cadastro de usuário
│   ├── produtos.html              # Listagem de produtos
│   ├── carrinho.html              # Carrinho
│   ├── pagamento.html             # Checkout
│   └── sobre.html                 # Sobre a empresa
│
├── 📄 api.js                       # Cliente HTTP para API
├── 📄 script.js                    # Scripts frontend legacy
├── 📄 styles.css                   # Estilos CSS legacy
│
└── 📂 server/                      # Backend Node.js
    ├── 📄 package.json             # Dependências backend
    ├── 📄 .env.example             # Template variáveis ambiente
    ├── 📄 .env                     # Configurações sensíveis (gitignore)
    │
    └── 📂 src/
        ├── 📄 index.js             # Entry point servidor Express
        ├── 📄 seed.js              # Script de população do banco
        │
        ├── 📂 models/              # Modelos Mongoose
        │   ├── User.js             # Schema de usuários
        │   ├── Product.js          # Schema de produtos
        │   ├── Cart.js             # Schema de carrinho
        │   └── Order.js            # Schema de pedidos
        │
        ├── 📂 routes/              # Rotas da API
        │   ├── auth.js             # Autenticação (registro/login)
        │   ├── products.js         # CRUD de produtos
        │   ├── cart.js             # Gerenciamento do carrinho
        │   └── orders.js           # Processamento de pedidos
        │
        ├── 📂 controllers/         # Lógica de negócio
        │
        └── 📂 middleware/          # Middlewares customizados
            └── auth.js             # Middleware de autenticação JWT
```

---

## ⚙️ Funcionalidades

### 🔐 Autenticação e Autorização

- [x] Cadastro de novos usuários
- [x] Login com email e senha
- [x] Hash de senhas com bcrypt (salt rounds: 8)
- [x] Geração de JWT tokens (validade: 7 dias)
- [x] Middleware de autenticação para rotas protegidas
- [x] Logout e limpeza de token

### 🛍️ Catálogo de Produtos

- [x] Listagem de produtos disponíveis
- [x] Busca e filtros (nome, categoria, preço)
- [x] Detalhes do produto (nome, descrição, preço, imagem, estoque)
- [x] Exibição de produtos orgânicos certificados
- [x] Indicação de disponibilidade em estoque

### 🛒 Carrinho de Compras

- [x] Adicionar produtos ao carrinho
- [x] Atualizar quantidade de itens
- [x] Remover produtos do carrinho
- [x] Cálculo automático do subtotal e total
- [x] Persistência do carrinho por usuário
- [x] Validação de estoque antes da compra

### 💳 Processamento de Pedidos

- [x] Criação de pedidos a partir do carrinho
- [x] Cálculo de frete e total final
- [x] Estados de pedido (pendente, processando, enviado, entregue)
- [x] Histórico de pedidos do usuário
- [x] Detalhes completos de cada pedido

### 📱 Interface e UX

- [x] Design responsivo (mobile-first)
- [x] Navegação SPA com React Router
- [x] Feedback visual de ações (loading, sucesso, erro)
- [x] Validação de formulários client-side
- [x] Mensagens de erro amigáveis

---

## 🔒 Segurança

### Implementações de Segurança

#### 1. **Autenticação JWT**
```javascript
// Token com payload mínimo
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1729094400,
  "exp": 1729699200
}
```
- Tokens assinados com secret forte
- Expiração em 7 dias
- Validação em todas as rotas protegidas

#### 2. **Hash de Senhas**
```javascript
// Bcrypt com 8 salt rounds
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});
```

#### 3. **Validação de Entrada**
- Express Validator para sanitização
- Validação de tipos de dados
- Proteção contra injeção NoSQL
- Validação de formato de email

#### 4. **CORS Configurado**
```javascript
app.use(cors()); // Permite requisições do frontend
```

#### 5. **Variáveis de Ambiente**
```bash
# Dados sensíveis nunca commitados
MONGODB_URI=mongodb://...
JWT_SECRET=secret_forte_aleatorio
PORT=5000
```

#### 6. **Middleware de Autenticação**
```javascript
// Proteção de rotas sensíveis
router.get('/me', authMiddleware, getUserProfile);
router.post('/cart/add', authMiddleware, addToCart);
```

### Pontos de Melhoria (Roadmap)

- [ ] Implementar rate limiting (express-rate-limit)
- [ ] Adicionar helmet.js para headers de segurança
- [ ] Implementar HTTPS em produção
- [ ] Adicionar refresh tokens
- [ ] Implementar 2FA (Two-Factor Authentication)
- [ ] Adicionar logging de tentativas de login falhas
- [ ] Sanitização avançada de HTML/XSS

---

## ✅ Qualidade de Código

### Boas Práticas Implementadas

#### 1. **Estrutura Modular**
- Separação clara de responsabilidades (MVC)
- Módulos reutilizáveis e testáveis
- Baixo acoplamento entre componentes

#### 2. **Tratamento de Erros**
```javascript
// Try-catch em todas as operações assíncronas
try {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuário não encontrado');
    // ...
} catch (error) {
    res.status(500).json({ msg: error.message });
}
```

#### 3. **Validação de Dados**
```javascript
// Validação antes de processamento
const { error, value } = schema.validate(req.body);
if (error) return res.status(400).json({ msg: error.details[0].message });
```

#### 4. **Async/Await**
- Uso consistente de async/await
- Evita callback hell
- Código mais legível e manutenível

#### 5. **Nomenclatura Semântica**
- Variáveis descritivas (camelCase)
- Funções com verbos de ação
- Constantes em UPPER_CASE

### Métricas de Código

| Métrica | Valor | Status |
|---------|-------|--------|
| **Linhas de Código Backend** | ~800 | ✅ |
| **Linhas de Código Frontend** | ~600 | ✅ |
| **Dependências Vulneráveis** | 2 moderate | ⚠️ |
| **Cobertura de Testes** | 0% | ❌ |
| **Documentação** | 85% | ✅ |

### Roadmap de Qualidade

- [ ] Implementar testes unitários (Jest)
- [ ] Implementar testes de integração (Supertest)
- [ ] Adicionar ESLint e Prettier
- [ ] Configurar Husky para pre-commit hooks
- [ ] Implementar CI/CD (GitHub Actions)
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Análise de código estático (SonarQube)

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 7.0 (local ou Atlas)
- Git

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Ludmila-cpu/Tcc.git
cd Tcc
```

### 2️⃣ Instalação do Frontend

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 5173)
npm run dev

# Build para produção
npm run build
```

### 3️⃣ Instalação do Backend

```bash
# Navegar para pasta do servidor
cd server

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
```

### 4️⃣ Configurar Variáveis de Ambiente

Edite o arquivo `server/.env`:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/vereco
# OU MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/vereco

# JWT Secret (MUDE EM PRODUÇÃO!)
JWT_SECRET=vereco_tcc_2025_secret_key_change_in_production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### 5️⃣ Popular Banco de Dados

```bash
# Executar script de seed (5 produtos)
npm run seed
```

### 6️⃣ Iniciar Servidor Backend

```bash
# Modo desenvolvimento (auto-reload)
npm run dev

# Modo produção
npm start
```

### 7️⃣ Acessar Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/

---

## 📊 Métricas do Projeto

### Estatísticas de Desenvolvimento

| Item | Quantidade |
|------|------------|
| **Páginas Frontend** | 7 (HTML) + 4 (React TSX) |
| **Componentes React** | 4+ |
| **Rotas API** | 15+ endpoints |
| **Modelos de Dados** | 4 (User, Product, Cart, Order) |
| **Middlewares** | 1 (Auth) |
| **Scripts Utilitários** | 1 (seed.js) |
| **Dependências Frontend** | 11 |
| **Dependências Backend** | 8 |
| **Dependências Dev** | 4 |

### Performance

| Métrica | Valor Alvo | Status |
|---------|-----------|--------|
| **API Response Time** | < 200ms | 🎯 |
| **Frontend Load Time** | < 2s | 🎯 |
| **Database Query Time** | < 50ms | 🎯 |
| **Build Size (Frontend)** | < 500KB | 🎯 |

### Banco de Dados

| Collection | Documentos | Índices |
|------------|-----------|---------|
| **users** | Variável | email (unique) |
| **products** | 5+ | nome, categoria |
| **carts** | Variável | userId |
| **orders** | Variável | userId, status |

---

## 🔄 Fluxo de Dados

### 1. Fluxo de Autenticação

```
┌──────────┐      POST /api/auth/register      ┌──────────┐
│  Cliente │ ────────────────────────────────> │  Backend │
│ (Browser)│      { email, senha, nome }       │ (Express)│
└──────────┘                                    └─────┬────┘
     ▲                                                │
     │                                                ▼
     │                                          ┌──────────┐
     │                                          │ MongoDB  │
     │                                          │ (Insert) │
     │                                          └─────┬────┘
     │                                                │
     │          { token, user }                       ▼
     └──────────────────────────────────────── Gera JWT Token
                                                      │
                                        localStorage.setItem('authToken')
```

### 2. Fluxo de Compra

```
1. Cliente navega produtos     → GET /api/products
2. Cliente adiciona ao carrinho → POST /api/cart/add
3. Backend valida estoque      → Mongoose: Product.findById()
4. Atualiza carrinho           → Cart.findOneAndUpdate()
5. Cliente finaliza compra     → POST /api/orders/create
6. Backend cria pedido         → Order.create()
7. Atualiza estoque            → Product.updateMany()
8. Retorna confirmação         → { order, totalPrice }
```

### 3. Fluxo de Dados (Carrinho)

```
Frontend (api.js)
    ↓
CartAPI.addItem({ productId, quantity })
    ↓
POST /api/cart/add + Authorization: Bearer <token>
    ↓
authMiddleware: verifica token JWT
    ↓
cartRoutes: router.post('/add')
    ↓
Valida estoque: Product.findById(productId)
    ↓
Atualiza carrinho: Cart.findOneAndUpdate({ userId })
    ↓
Calcula total: cart.calculateTotal()
    ↓
Retorna: { cart, totalPrice }
    ↓
Frontend atualiza UI
```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 🔐 Autenticação

#### POST `/auth/register`
Registra um novo usuário.

**Request Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "telefone": "11999999999",
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  }
}
```

**Response (201):**
```json
{
  "msg": "Usuário cadastrado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

---

#### POST `/auth/login`
Autentica um usuário existente.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "msg": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

---

#### GET `/auth/me`
Retorna dados do usuário autenticado. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "11999999999",
  "endereco": {...}
}
```

---

### 🛍️ Produtos

#### GET `/products`
Lista todos os produtos disponíveis.

**Response (200):**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "nome": "Maçã Orgânica",
    "descricao": "Maçã orgânica fresca",
    "preco": 8.90,
    "categoria": "Frutas",
    "imagem": "https://exemplo.com/maca.jpg",
    "estoque": 100
  },
  ...
]
```

---

#### GET `/products/:id`
Retorna detalhes de um produto específico.

**Response (200):**
```json
{
  "_id": "507f191e810c19729de860ea",
  "nome": "Maçã Orgânica",
  "descricao": "Maçã orgânica fresca e saborosa...",
  "preco": 8.90,
  "categoria": "Frutas",
  "imagem": "https://exemplo.com/maca.jpg",
  "estoque": 100
}
```

---

### 🛒 Carrinho

Todas as rotas de carrinho **requerem autenticação**.

#### POST `/cart/add`
Adiciona um produto ao carrinho.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": "507f191e810c19729de860ea",
  "quantity": 2
}
```

**Response (200):**
```json
{
  "msg": "Produto adicionado ao carrinho",
  "cart": {
    "_id": "507f...",
    "userId": "507f...",
    "items": [
      {
        "productId": "507f191e810c19729de860ea",
        "quantity": 2,
        "price": 8.90
      }
    ],
    "totalPrice": 17.80
  }
}
```

---

#### GET `/cart`
Retorna o carrinho do usuário autenticado.

**Response (200):**
```json
{
  "_id": "507f...",
  "userId": "507f...",
  "items": [...],
  "totalPrice": 17.80
}
```

---

#### PUT `/cart/update`
Atualiza a quantidade de um item no carrinho.

**Request Body:**
```json
{
  "productId": "507f191e810c19729de860ea",
  "quantity": 5
}
```

---

#### DELETE `/cart/remove/:productId`
Remove um produto do carrinho.

**Response (200):**
```json
{
  "msg": "Produto removido do carrinho",
  "cart": {...}
}
```

---

### 📦 Pedidos

Todas as rotas de pedidos **requerem autenticação**.

#### POST `/orders/create`
Cria um novo pedido a partir do carrinho.

**Request Body:**
```json
{
  "enderecoEntrega": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  },
  "metodoPagamento": "cartao"
}
```

**Response (201):**
```json
{
  "msg": "Pedido criado com sucesso!",
  "order": {
    "_id": "507f...",
    "userId": "507f...",
    "items": [...],
    "totalPrice": 17.80,
    "status": "pendente",
    "createdAt": "2025-10-16T..."
  }
}
```

---

#### GET `/orders`
Lista todos os pedidos do usuário autenticado.

**Response (200):**
```json
[
  {
    "_id": "507f...",
    "items": [...],
    "totalPrice": 17.80,
    "status": "pendente",
    "createdAt": "2025-10-16T..."
  },
  ...
]
```

---

#### GET `/orders/:id`
Retorna detalhes de um pedido específico.

**Response (200):**
```json
{
  "_id": "507f...",
  "userId": "507f...",
  "items": [
    {
      "productId": {...},
      "quantity": 2,
      "price": 8.90
    }
  ],
  "totalPrice": 17.80,
  "status": "processando",
  "enderecoEntrega": {...},
  "metodoPagamento": "cartao",
  "createdAt": "2025-10-16T...",
  "updatedAt": "2025-10-16T..."
}
```

---

## 🎨 Páginas Frontend

### Páginas HTML (Legacy)

1. **index.html** - Landing page inicial
2. **login.html** - Tela de login
3. **cadastro.html** - Formulário de cadastro
4. **produtos.html** - Catálogo de produtos
5. **carrinho.html** - Visualização do carrinho
6. **pagamento.html** - Checkout e pagamento
7. **sobre.html** - Sobre a empresa

### Páginas React (TSX)

1. **LoginPage.tsx** - Autenticação de usuários
2. **ProductsPage.tsx** - Listagem de produtos com filtros
3. **CartPage.tsx** - Gerenciamento do carrinho
4. **PaymentPage.tsx** - Finalização de compra

---

## 👨‍💻 Desenvolvedor

**Ludmila Soares**  
Estudante de TCC  
Repositório: [github.com/Ludmila-cpu/Tcc](https://github.com/Ludmila-cpu/Tcc)

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos (TCC).

---

## 🔮 Roadmap Futuro

### Funcionalidades

- [ ] Sistema de busca avançada
- [ ] Filtros por faixa de preço
- [ ] Sistema de avaliações de produtos
- [ ] Wishlist (lista de desejos)
- [ ] Cupons de desconto
- [ ] Programa de fidelidade
- [ ] Painel administrativo
- [ ] Dashboard de vendas
- [ ] Notificações em tempo real

### Tecnologias

- [ ] Migração completa para React
- [ ] Implementar Redux/Context API
- [ ] Adicionar TypeScript no backend
- [ ] WebSockets para notificações
- [ ] Upload de imagens (AWS S3/Cloudinary)
- [ ] Envio de emails (Nodemailer)
- [ ] Integração com gateway de pagamento real
- [ ] PWA (Progressive Web App)

### DevOps

- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deploy em nuvem (Vercel + Railway/Render)
- [ ] Monitoring e logs (Sentry)
- [ ] Backup automático do banco
- [ ] CDN para assets estáticos

---

## 🆘 Troubleshooting

### Erro: "Cannot connect to MongoDB"
```bash
# Verifique se o MongoDB está rodando:
mongod --version

# Ou use MongoDB Atlas e configure MONGODB_URI no .env
```

### Erro: "ERR_CONNECTION_REFUSED"
```bash
# Certifique-se de que o backend está rodando:
cd server
npm run dev
```

### Erro: "Invalid token"
```bash
# Limpe o localStorage e faça login novamente
localStorage.clear()
```

---

## 📚 Referências

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [MongoDB Manual](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [JWT.io](https://jwt.io)
- [Mongoose Docs](https://mongoosejs.com/docs)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela no repositório! ⭐**

Desenvolvido com 💚 por **Ludmila Soares** - TCC 2025

</div>
