# Vereco Backend Server

Backend API para o e-commerce Vereco de produtos orgânicos.

## 🛠️ Tecnologias

- **Node.js** + **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados NoSQL
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Helmet** - Segurança de headers HTTP
- **Express Rate Limit** - Proteção contra ataques de força bruta
- **Morgan** - Logging de requisições HTTP
- **CORS** - Controle de acesso entre origens

## 📦 Estrutura do Banco de Dados

### Collections

#### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  address: {
    street, city, state, zipCode
  },
  isAdmin: Boolean,
  createdAt: Date
}
```

#### Products
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String ('frutas', 'verduras', 'processados', 'mel'),
  stock: Number,
  unit: String ('kg', 'un', 'frasco'),
  createdAt: Date
}
```

#### Carts
```javascript
{
  user: ObjectId (ref User),
  items: [{
    product: ObjectId (ref Product),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number (auto-calculated),
  updatedAt: Date
}
```

#### Orders
```javascript
{
  user: ObjectId (ref User),
  items: [{
    product: ObjectId (ref Product),
    name: String,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String ('pendente', 'processando', 'enviado', 'entregue', 'cancelado'),
  shippingAddress: {
    street, city, state, zipCode
  },
  paymentMethod: String ('cartao', 'pix', 'boleto'),
  paymentStatus: String ('pendente', 'aprovado', 'recusado'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Instalação

### 1. Instalar dependências
```bash
cd server
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configuração do Servidor
PORT=5000
NODE_ENV=development

# Banco de Dados MongoDB
MONGODB_URI=mongodb://localhost:27017/vereco

# JWT Secret (ALTERE em produção!)
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# CORS - URLs permitidas (separe por vírgula)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**⚠️ IMPORTANTE:** Em produção, altere o `JWT_SECRET` para uma string aleatória complexa!

### 3. Iniciar MongoDB

Certifique-se de que o MongoDB está rodando localmente ou configure uma conexão com MongoDB Atlas.

**MongoDB local (Windows):**
```bash
mongod
```

**MongoDB Atlas:**
- Crie um cluster gratuito em [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Copie a connection string e atualize `MONGODB_URI` no `.env`

### 4. Popular o banco com dados iniciais

```bash
npm run seed
```

Este comando criará 5 produtos (frutas e verduras) no banco.

### 5. Iniciar o servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

## 📡 Endpoints da API

### 🏠 Sistema

- `GET /` - Informações da API
- `GET /health` - Health check do servidor

### 👤 Autenticação

- `POST /api/auth/register` - Registrar novo usuário
  - Body: `{ name, email, password }`
  
- `POST /api/auth/login` - Login (retorna JWT token)
  - Body: `{ email, password }`
  - Response: `{ token }`
  
- `GET /api/auth/me` - Obter perfil do usuário autenticado 🔒
  - Headers: `Authorization: Bearer {token}`
  
- `PUT /api/auth/profile` - Atualizar perfil do usuário 🔒
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ name?, email?, address? }`

### 📦 Produtos

- `GET /api/products` - Listar produtos com filtros e paginação
  - Query params:
    - `category`: frutas | verduras | processados | mel
    - `search`: buscar por nome ou descrição
    - `minPrice`: preço mínimo
    - `maxPrice`: preço máximo
    - `page`: número da página (padrão: 1)
    - `limit`: itens por página (padrão: 10)
    - `sort`: campo para ordenação (padrão: createdAt)
  - Exemplo: `/api/products?category=frutas&page=1&limit=10`
  
- `GET /api/products/:id` - Buscar produto por ID

- `POST /api/products` - Criar produto 🔒 (admin apenas)
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ name, description, price, image, category, stock, unit }`
  
- `PUT /api/products/:id` - Atualizar produto 🔒 (admin apenas)
  - Headers: `Authorization: Bearer {token}`
  
- `DELETE /api/products/:id` - Deletar produto 🔒 (admin apenas)
  - Headers: `Authorization: Bearer {token}`

### 🛒 Carrinho

- `GET /api/cart` - Buscar carrinho do usuário 🔒
  - Headers: `Authorization: Bearer {token}`
  
- `POST /api/cart/add` - Adicionar produto ao carrinho 🔒
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ productId, quantity }`
  
- `PUT /api/cart/update/:productId` - Atualizar quantidade 🔒
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ quantity }`
  
- `DELETE /api/cart/remove/:productId` - Remover item do carrinho 🔒
  - Headers: `Authorization: Bearer {token}`
  
- `DELETE /api/cart/clear` - Limpar carrinho completamente 🔒
  - Headers: `Authorization: Bearer {token}`

### 📋 Pedidos

- `POST /api/orders` - Criar pedido a partir do carrinho 🔒
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ shippingAddress: { street, city, state, zipCode }, paymentMethod }`
  
- `GET /api/orders` - Listar pedidos do usuário 🔒
  - Headers: `Authorization: Bearer {token}`
  
- `GET /api/orders/:id` - Buscar pedido específico 🔒
  - Headers: `Authorization: Bearer {token}`
  
- `PUT /api/orders/:id/status` - Atualizar status do pedido 🔒 (admin apenas)
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ status }`
  
- `GET /api/orders/admin/all` - Listar todos os pedidos 🔒 (admin apenas)
  - Headers: `Authorization: Bearer {token}`

**🔒 = Requer autenticação (token JWT)**

## 🔐 Autenticação JWT

Use o token JWT retornado no login nos headers das requisições protegidas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

O token expira em **24 horas**.

## 🛡️ Segurança

A API implementa as seguintes medidas de segurança:

- **Helmet**: Proteção de headers HTTP
- **Rate Limiting**: 
  - Limite geral: 100 requisições por 15 minutos
  - Login/Registro: 5 tentativas por 15 minutos
- **CORS**: Controle de acesso entre origens
- **JWT**: Tokens com expiração de 24h
- **bcryptjs**: Hash seguro de senhas (8 salt rounds)
- **Validação de dados**: Express-validator em todas as rotas críticas

## 🧪 Testando a API

### Usando cURL

**Registrar usuário:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Listar produtos:**
```bash
curl http://localhost:5000/api/products
```

**Listar produtos com filtros:**
```bash
# Filtrar por categoria
curl "http://localhost:5000/api/products?category=frutas"

# Buscar por nome
curl "http://localhost:5000/api/products?search=maçã"

# Filtrar por preço
curl "http://localhost:5000/api/products?minPrice=5&maxPrice=10"

# Com paginação
curl "http://localhost:5000/api/products?page=1&limit=5"
```

**Acessar rota protegida:**
```bash
# Substitua {seu_token} pelo token recebido no login
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer {seu_token}"
```

### Usando Postman ou Insomnia

1. Crie uma nova request
2. Configure o método HTTP (GET, POST, PUT, DELETE)
3. Insira a URL do endpoint
4. Para rotas protegidas, adicione o header:
   - Key: `Authorization`
   - Value: `Bearer {seu_token}`
5. Para POST/PUT, configure o Body como JSON

## � Estrutura de Resposta

### Sucesso
```json
{
  "success": true,
  "data": { ... }
}
```

### Erro
```json
{
  "success": false,
  "msg": "Mensagem de erro",
  "errors": [ ... ]  // opcional
}
```

## 🐛 Troubleshooting

### MongoDB não conecta
- Verifique se o MongoDB está rodando: `mongod`
- Confirme a MONGODB_URI no arquivo `.env`
- Se usar MongoDB Atlas, verifique se o IP está na whitelist

### Token inválido ou expirado
- Faça login novamente para obter um novo token
- Tokens expiram em 24 horas

### Rate limit atingido
- Aguarde 15 minutos ou ajuste o limite em `src/index.js`

### CORS bloqueando requisições
- Adicione sua origem no array `ALLOWED_ORIGINS` no `.env`

## 📝 Features Implementadas

- ✅ CRUD completo de produtos
- ✅ Sistema de autenticação JWT
- ✅ Gerenciamento de carrinho
- ✅ Sistema de pedidos
- ✅ Filtros e busca de produtos
- ✅ Paginação
- ✅ Rate limiting
- ✅ Segurança com Helmet
- ✅ Validação de dados
- ✅ Tratamento de erros centralizado
- ✅ Logging com Morgan
- ✅ Perfil de usuário (obter e atualizar)

## 🚀 Próximos Passos

- [ ] Validação de estoque ao criar pedidos
- [ ] Upload de imagens (Multer + AWS S3 ou Cloudinary)
- [ ] Sistema de reviews/avaliações de produtos
- [ ] Integração com gateway de pagamento (Stripe, Mercado Pago)
- [ ] Notificações por email (NodeMailer)
- [ ] Sistema de cupons de desconto
- [ ] Histórico de preços
- [ ] Relatórios e dashboards (admin)
- [ ] Testes automatizados (Jest)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
- [ ] Dashboard administrativo

## 🐛 Troubleshooting

**Erro: "MongoServerError: connect ECONNREFUSED"**
- Certifique-se de que o MongoDB está rodando

**Erro: "ValidationError"**
- Verifique se todos os campos obrigatórios foram enviados

**Erro: "jwt malformed"**
- Token inválido ou expirado, faça login novamente

## 📄 Licença

MIT
