# 🔗 Guia de Integração Front-end ↔ Back-end - Vereco

## ✅ INTEGRAÇÃO COMPLETA IMPLEMENTADA!

---

## 📋 O Que Foi Feito

### 1. ⚙️ Configuração Inicial
- ✅ Axios adicionado ao `package.json`
- ✅ Variáveis de ambiente (`.env` e `.env.example`)
- ✅ Serviço de API centralizado (`src/services/api.ts`)

### 2. 🔐 Sistema de Autenticação
- ✅ AuthContext para gerenciar estado do usuário
- ✅ Login e registro com JWT
- ✅ Armazenamento seguro do token
- ✅ Proteção de rotas privadas
- ✅ Logout automático quando token expira

### 3. 🛒 Sistema de Carrinho
- ✅ CartContext para gerenciar estado do carrinho
- ✅ Adicionar/remover produtos
- ✅ Atualizar quantidades
- ✅ Sincronização automática com backend

### 4. 📦 Páginas Integradas
- ✅ LoginPage - Login/Registro com validação
- ✅ ProductsPage - Listagem com filtros e paginação
- ✅ CartPage - Gerenciamento do carrinho
- ✅ PaymentPage - Finalização de pedidos

### 5. 🎨 Componentes Criados
- ✅ Header - Navegação e contador de carrinho
- ✅ ProductCard - Card de produto reutilizável
- ✅ Loading - Indicador de carregamento
- ✅ PrivateRoute - Proteção de rotas

---

## 🚀 Como Rodar o Projeto Completo

### Passo 1: Instalar Dependências

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vereco
JWT_SECRET=vereco_jwt_secret_2024_change_in_production
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### Passo 3: Popular o Banco de Dados
```bash
cd backend
npm run seed
```

### Passo 4: Iniciar o Backend
```bash
cd backend
npm run dev
```

**Backend rodará em:** `http://localhost:5000`

### Passo 5: Iniciar o Frontend
```bash
cd frontend
npm run dev
```

**Frontend rodará em:** `http://localhost:5173`

---

## 🔍 Estrutura de Arquivos Criados/Modificados

### Frontend

```
frontend/
├── .env                              [NOVO]
├── .env.example                      [NOVO]
├── package.json                      [MODIFICADO - axios adicionado]
│
├── src/
│   ├── App.tsx                       [MODIFICADO - Providers e rotas protegidas]
│   │
│   ├── services/
│   │   └── api.ts                    [NOVO - Serviço de API]
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx           [NOVO - Context de autenticação]
│   │   └── CartContext.tsx           [NOVO - Context do carrinho]
│   │
│   ├── components/
│   │   ├── Header.tsx                [NOVO - Cabeçalho com navegação]
│   │   ├── ProductCard.tsx           [NOVO - Card de produto]
│   │   └── Loading.tsx               [NOVO - Indicador de loading]
│   │
│   └── pages/
│       ├── LoginPage.tsx             [MODIFICADO - Integração completa]
│       ├── ProductsPage.tsx          [MODIFICADO - Listagem e filtros]
│       ├── CartPage.tsx              [MODIFICADO - Gerenciamento completo]
│       └── PaymentPage.tsx           [MODIFICADO - Finalização de pedidos]
```

---

## 🔐 Fluxo de Autenticação

### 1. **Registro/Login**
```typescript
// O usuário faz login
await login(email, password);

// Token é salvo no localStorage
localStorage.setItem('token', token);

// Usuário é salvo no localStorage
localStorage.setItem('user', JSON.stringify(user));

// AuthContext atualiza o estado
setUser(user);
setToken(token);
```

### 2. **Requisições Autenticadas**
```typescript
// Axios interceptor adiciona token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. **Tratamento de Erros 401**
```typescript
// Se token expirar ou for inválido
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpar dados e redirecionar
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  }
);
```

---

## 🛒 Fluxo do Carrinho

### 1. **Adicionar Produto**
```typescript
// Usuário clica em "Adicionar ao Carrinho"
await addToCart(productId, 1);

// Request POST /api/cart/add
// Backend atualiza carrinho
// CartContext atualiza estado local
```

### 2. **Atualizar Quantidade**
```typescript
// Usuário muda quantidade
await updateQuantity(productId, newQuantity);

// Request PUT /api/cart/update/:productId
// Backend recalcula total
// CartContext atualiza estado
```

### 3. **Remover Item**
```typescript
// Usuário remove item
await removeFromCart(productId);

// Request DELETE /api/cart/remove/:productId
// Backend remove item
// CartContext atualiza estado
```

---

## 📦 Fluxo de Pedido

### 1. **Usuário no Carrinho**
- Ve os produtos
- Pode alterar quantidades
- Ve o total
- Clica em "Finalizar Compra"

### 2. **Página de Pagamento**
- Preenche endereço de entrega
- Escolhe método de pagamento
- Clica em "Finalizar Pedido"

### 3. **Backend Processa**
```typescript
// Request POST /api/orders
await ordersAPI.create({
  shippingAddress,
  paymentMethod
});

// Backend:
// 1. Cria pedido a partir do carrinho
// 2. Limpa o carrinho
// 3. Retorna dados do pedido
```

### 4. **Frontend Finaliza**
```typescript
// Limpa carrinho local
await clearCart();

// Mostra mensagem de sucesso
alert('Pedido criado com sucesso!');

// Redireciona para produtos
navigate('/produtos');
```

---

## 🎯 Endpoints Utilizados

### Autenticação
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil do usuário

### Produtos
- `GET /api/products?category=frutas&search=maçã&page=1` - Listar com filtros
- `GET /api/products/:id` - Buscar por ID

### Carrinho
- `GET /api/cart` - Obter carrinho
- `POST /api/cart/add` - Adicionar item
- `PUT /api/cart/update/:productId` - Atualizar quantidade
- `DELETE /api/cart/remove/:productId` - Remover item

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders` - Listar pedidos do usuário

---

## 🔧 Configurações Importantes

### CORS no Backend
```javascript
// backend/src/index.js
const allowedOrigins = [
  'http://localhost:5173',  // Vite dev server
  'http://localhost:3000'   // Alternativo
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### Proxy no Frontend (Opcional)
Se precisar, adicione no `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

---

## 🐛 Troubleshooting

### Erro: "Network Error"
**Causa:** Backend não está rodando ou CORS bloqueado  
**Solução:**
1. Verifique se backend está em http://localhost:5000
2. Verifique CORS no backend
3. Verifique `.env` do frontend

### Erro: "Token inválido"
**Causa:** Token expirou ou JWT_SECRET diferente  
**Solução:**
1. Faça login novamente
2. Verifique JWT_SECRET no backend
3. Limpe localStorage do navegador

### Erro: "Cannot find module 'axios'"
**Causa:** Dependências não instaladas  
**Solução:**
```bash
cd frontend
npm install
```

### Carrinho não atualiza
**Causa:** Requisição falhando  
**Solução:**
1. Abra DevTools (F12) → Network
2. Veja se há erros 401/403
3. Verifique se está autenticado
4. Veja console para erros

---

## ✅ Checklist de Integração

### Backend
- [x] API rodando na porta 5000
- [x] MongoDB conectado
- [x] Produtos populados (`npm run seed`)
- [x] CORS configurado para localhost:5173
- [x] JWT_SECRET configurado

### Frontend
- [x] Axios instalado
- [x] .env configurado com VITE_API_URL
- [x] AuthProvider envolvendo App
- [x] CartProvider envolvendo App
- [x] Rotas protegidas configuradas

### Funcional
- [ ] Login/Registro funcionando
- [ ] Produtos carregando
- [ ] Filtros funcionando
- [ ] Adicionar ao carrinho funcionando
- [ ] Carrinho atualizando
- [ ] Finalizar pedido funcionando

---

## 🎉 Próximos Passos

### Curto Prazo
1. Testar todos os fluxos
2. Adicionar validação de formulários
3. Melhorar feedback visual (toasts)
4. Adicionar página de pedidos do usuário

### Médio Prazo
5. Implementar busca em tempo real
6. Adicionar favoritos
7. Sistema de avaliações
8. Upload de avatar do usuário

### Longo Prazo
9. PWA (Progressive Web App)
10. Notificações push
11. Chat de suporte
12. Painel administrativo

---

## 📚 Documentação de Referência

- **Backend API:** `backend/API_DOCUMENTATION.md`
- **Backend README:** `backend/README.md`
- **Axios:** https://axios-http.com/
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/

---

**Integração Completa:** ✅  
**Data:** 17 de Outubro de 2025  
**Status:** Pronto para testes

**Boa sorte com seu projeto! 🚀**
