# 📖 Documentação Completa da API Vereco

## 🔗 Base URL
```
http://localhost:5000
```

---

## 🏠 Sistema

### Health Check
```http
GET /health
```

**Response 200:**
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2025-10-17T12:00:00.000Z",
  "uptime": 3600
}
```

### Informações da API
```http
GET /
```

**Response 200:**
```json
{
  "success": true,
  "message": "API Vereco funcionando!",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "products": "/api/products",
    "cart": "/api/cart",
    "orders": "/api/orders"
  }
}
```

---

## 👤 Autenticação

### Registrar Usuário
```http
POST /api/auth/register
Content-Type: application/json
```

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response 201:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400` - Validação falhou (email inválido, senha muito curta, etc)
- `400` - Usuário já existe

---

### Login
```http
POST /api/auth/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400` - Credenciais inválidas
- `400` - Validação falhou

---

### Obter Perfil do Usuário 🔒
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "success": true,
  "user": {
    "_id": "64abc123...",
    "name": "João Silva",
    "email": "joao@example.com",
    "address": {
      "street": "Rua X, 123",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01000-000"
    },
    "isAdmin": false,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Token não fornecido ou inválido

---

### Atualizar Perfil 🔒
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "João Silva Santos",
  "email": "joao.novo@example.com",
  "address": {
    "street": "Rua Y, 456",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "zipCode": "20000-000"
  }
}
```

**Response 200:**
```json
{
  "success": true,
  "user": {
    "_id": "64abc123...",
    "name": "João Silva Santos",
    "email": "joao.novo@example.com",
    "address": { ... },
    "isAdmin": false,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Email já em uso
- `400` - Validação falhou
- `401` - Não autenticado

---

## 📦 Produtos

### Listar Produtos com Filtros
```http
GET /api/products?category=frutas&search=maçã&minPrice=5&maxPrice=15&page=1&limit=10&sort=price
```

**Query Parameters:**
- `category` (optional): frutas | verduras | processados | mel
- `search` (optional): buscar por nome ou descrição
- `minPrice` (optional): preço mínimo
- `maxPrice` (optional): preço máximo
- `page` (optional): número da página (default: 1)
- `limit` (optional): itens por página (default: 10)
- `sort` (optional): campo para ordenação (default: createdAt)

**Response 200:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "64abc123...",
      "name": "Maçã Orgânica",
      "description": "Maçãs frescas e crocantes",
      "price": 7.90,
      "image": "https://...",
      "category": "frutas",
      "stock": 50,
      "unit": "kg",
      "createdAt": "2025-01-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 25,
    "limit": 10
  }
}
```

---

### Buscar Produto por ID
```http
GET /api/products/:id
```

**Response 200:**
```json
{
  "_id": "64abc123...",
  "name": "Maçã Orgânica",
  "description": "Maçãs frescas e crocantes",
  "price": 7.90,
  "image": "https://...",
  "category": "frutas",
  "stock": 50,
  "unit": "kg",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

**Errors:**
- `404` - Produto não encontrado

---

### Criar Produto 🔒 (Admin)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Laranja Lima",
  "description": "Laranjas doces e suculentas",
  "price": 6.50,
  "image": "https://...",
  "category": "frutas",
  "stock": 100,
  "unit": "kg"
}
```

**Response 201:**
```json
{
  "_id": "64abc456...",
  "name": "Laranja Lima",
  "description": "Laranjas doces e suculentas",
  "price": 6.50,
  "image": "https://...",
  "category": "frutas",
  "stock": 100,
  "unit": "kg",
  "createdAt": "2025-01-15T12:00:00.000Z"
}
```

**Errors:**
- `401` - Não autenticado
- `403` - Não é admin

---

### Atualizar Produto 🔒 (Admin)
```http
PUT /api/products/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "price": 7.00,
  "stock": 80
}
```

**Response 200:**
```json
{
  "_id": "64abc456...",
  "name": "Laranja Lima",
  "price": 7.00,
  "stock": 80,
  ...
}
```

**Errors:**
- `401` - Não autenticado
- `403` - Não é admin
- `404` - Produto não encontrado

---

### Deletar Produto 🔒 (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "msg": "Produto removido"
}
```

**Errors:**
- `401` - Não autenticado
- `403` - Não é admin
- `404` - Produto não encontrado

---

## 🛒 Carrinho

### Obter Carrinho 🔒
```http
GET /api/cart
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "_id": "64abc789...",
  "user": "64abc123...",
  "items": [
    {
      "product": {
        "_id": "64abc456...",
        "name": "Maçã Orgânica",
        "price": 7.90,
        "image": "https://..."
      },
      "quantity": 3,
      "price": 7.90
    }
  ],
  "totalPrice": 23.70,
  "updatedAt": "2025-01-15T12:00:00.000Z"
}
```

---

### Adicionar ao Carrinho 🔒
```http
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "64abc456...",
  "quantity": 2
}
```

**Response 201:**
```json
{
  "_id": "64abc789...",
  "user": "64abc123...",
  "items": [ ... ],
  "totalPrice": 15.80
}
```

**Errors:**
- `404` - Produto não encontrado
- `401` - Não autenticado

---

### Atualizar Quantidade 🔒
```http
PUT /api/cart/update/:productId
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "quantity": 5
}
```

**Response 200:**
```json
{
  "_id": "64abc789...",
  "items": [ ... ],
  "totalPrice": 39.50
}
```

---

### Remover Item 🔒
```http
DELETE /api/cart/remove/:productId
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "_id": "64abc789...",
  "items": [ ... ],
  "totalPrice": 15.80
}
```

---

### Limpar Carrinho 🔒
```http
DELETE /api/cart/clear
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "msg": "Carrinho limpo"
}
```

---

## 📋 Pedidos

### Criar Pedido 🔒
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
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

**Response 201:**
```json
{
  "_id": "64abc999...",
  "user": "64abc123...",
  "items": [ ... ],
  "totalPrice": 39.50,
  "status": "pendente",
  "paymentStatus": "pendente",
  "shippingAddress": { ... },
  "paymentMethod": "cartao",
  "createdAt": "2025-01-15T12:00:00.000Z"
}
```

**Errors:**
- `400` - Carrinho vazio
- `401` - Não autenticado

---

### Listar Pedidos do Usuário 🔒
```http
GET /api/orders
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "_id": "64abc999...",
    "user": "64abc123...",
    "items": [ ... ],
    "totalPrice": 39.50,
    "status": "enviado",
    "createdAt": "2025-01-15T12:00:00.000Z"
  }
]
```

---

### Buscar Pedido Específico 🔒
```http
GET /api/orders/:id
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "_id": "64abc999...",
  "user": "64abc123...",
  "items": [ ... ],
  "totalPrice": 39.50,
  "status": "entregue",
  "shippingAddress": { ... },
  "paymentMethod": "cartao",
  "paymentStatus": "aprovado",
  "createdAt": "2025-01-15T12:00:00.000Z"
}
```

**Errors:**
- `404` - Pedido não encontrado
- `401` - Não autenticado

---

### Atualizar Status do Pedido 🔒 (Admin)
```http
PUT /api/orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "status": "enviado"
}
```

**Status possíveis:**
- `pendente`
- `processando`
- `enviado`
- `entregue`
- `cancelado`

**Response 200:**
```json
{
  "_id": "64abc999...",
  "status": "enviado",
  ...
}
```

**Errors:**
- `401` - Não autenticado
- `403` - Não é admin
- `404` - Pedido não encontrado

---

### Listar Todos os Pedidos 🔒 (Admin)
```http
GET /api/orders/admin/all
Authorization: Bearer {token}
```

**Response 200:**
```json
[
  {
    "_id": "64abc999...",
    "user": { ... },
    "items": [ ... ],
    "totalPrice": 39.50,
    "status": "processando",
    "createdAt": "2025-01-15T12:00:00.000Z"
  }
]
```

**Errors:**
- `401` - Não autenticado
- `403` - Não é admin

---

## 🔒 Legenda

- 🔒 = Requer autenticação (Header `Authorization: Bearer {token}`)
- (Admin) = Requer que o usuário seja admin (`isAdmin: true`)

---

## 📊 Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Erro de validação ou dados inválidos
- `401 Unauthorized` - Não autenticado ou token inválido
- `403 Forbidden` - Autenticado mas sem permissão
- `404 Not Found` - Recurso não encontrado
- `429 Too Many Requests` - Rate limit atingido
- `500 Internal Server Error` - Erro no servidor

---

## 🛡️ Rate Limits

- **Geral**: 100 requisições por 15 minutos
- **Login/Registro**: 5 tentativas por 15 minutos

Se o limite for atingido, aguarde 15 minutos antes de tentar novamente.
