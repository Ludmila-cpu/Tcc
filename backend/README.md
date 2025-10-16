# Vereco Backend Server

Backend API para o e-commerce Vereco de produtos orgânicos.

## 🛠️ Tecnologias

- **Node.js** + **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados NoSQL
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

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

Crie o arquivo `.env` na raiz do diretório `server`:

```env
MONGODB_URI=mongodb://localhost:27017/vereco
JWT_SECRET=sua_chave_secreta_aqui_mude_em_producao
PORT=5000
NODE_ENV=development
```

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

### Produtos

- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Buscar produto por ID
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login (retorna JWT token)
- `GET /api/auth/me` - Dados do usuário logado (requer token)

### Carrinho

- `GET /api/cart` - Buscar carrinho do usuário (requer autenticação)
- `POST /api/cart/add` - Adicionar produto ao carrinho
  ```json
  {
    "productId": "64abc123...",
    "quantity": 2
  }
  ```
- `PUT /api/cart/update/:productId` - Atualizar quantidade
  ```json
  {
    "quantity": 3
  }
  ```
- `DELETE /api/cart/remove/:productId` - Remover item
- `DELETE /api/cart/clear` - Limpar carrinho

### Pedidos

- `POST /api/orders` - Criar pedido a partir do carrinho
  ```json
  {
    "shippingAddress": {
      "street": "Rua X, 123",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01000-000"
    },
    "paymentMethod": "cartao"
  }
  ```
- `GET /api/orders` - Listar pedidos do usuário
- `GET /api/orders/:id` - Buscar pedido específico
- `PUT /api/orders/:id/status` - Atualizar status (admin)
- `GET /api/orders/admin/all` - Listar todos os pedidos (admin)

## 🔐 Autenticação

Use o token JWT retornado no login nos headers das requisições protegidas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

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

### Usando Postman ou Insomnia

Importe a collection ou crie requests manualmente para testar cada endpoint.

## 📝 Próximos Passos

- [ ] Adicionar validação de estoque ao criar pedidos
- [ ] Implementar upload de imagens (Multer + AWS S3)
- [ ] Adicionar filtros e busca de produtos
- [ ] Implementar paginação
- [ ] Adicionar sistema de reviews/avaliações
- [ ] Integração com gateway de pagamento real
- [ ] Notificações por email (NodeMailer)
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
