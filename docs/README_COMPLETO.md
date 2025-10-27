# 🌱 Vereco - E-commerce de Produtos Orgânicos

E-commerce completo para venda de produtos orgânicos, desenvolvido com **React + TypeScript** (frontend) e **Node.js + Express + MongoDB** (backend).

---

## 🚀 Início Rápido

### Opção 1: Instalação Automática (Windows)

```bash
# 1. Instalar todas as dependências
.\instalar-tudo.bat

# 2. Iniciar backend e frontend
.\iniciar-dev.bat
```

### Opção 2: Instalação Manual

**1. Backend:**
```bash
cd backend
npm install
npm run seed    # Popular banco
npm run dev     # Iniciar servidor
```

**2. Frontend:**
```bash
cd frontend
npm install
npm run dev     # Iniciar aplicação
```

**Acessar:** http://localhost:5173

---

## 📋 Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) ou usar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (opcional)

---

## 🛠️ Tecnologias

### Frontend
- **React 19** + **TypeScript**
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **Axios** - HTTP client
- **Tailwind CSS** - Estilização

### Backend
- **Node.js** + **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Helmet** - Segurança
- **Rate Limiting** - Proteção contra ataques
- **Morgan** - Logs

---

## 📂 Estrutura do Projeto

```
Tcc/
├── backend/              # API REST (Node.js + Express)
│   ├── src/
│   │   ├── index.js     # Servidor principal
│   │   ├── middleware/   # Auth, errorHandler
│   │   ├── models/       # User, Product, Cart, Order
│   │   ├── routes/       # Rotas da API
│   │   └── seed.js       # Popular banco
│   ├── .env             # Variáveis de ambiente
│   └── package.json
│
├── frontend/             # Aplicação React
│   ├── src/
│   │   ├── App.tsx      # Componente principal
│   │   ├── contexts/     # AuthContext, CartContext
│   │   ├── services/     # API service
│   │   ├── components/   # Componentes reutilizáveis
│   │   └── pages/        # Páginas da aplicação
│   ├── .env             # Variáveis de ambiente
│   └── package.json
│
├── instalar-tudo.bat    # Script de instalação
├── iniciar-dev.bat      # Script para iniciar dev
└── INTEGRACAO_FRONTEND_BACKEND.md  # Guia de integração
```

---

## ⚙️ Configuração

### Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vereco
JWT_SECRET=sua_chave_secreta_super_segura
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🔐 Funcionalidades

### ✅ Autenticação
- [x] Registro de usuário
- [x] Login com JWT
- [x] Proteção de rotas privadas
- [x] Logout
- [x] Gerenciamento de perfil

### ✅ Produtos
- [x] Listagem com paginação
- [x] Busca por nome/descrição
- [x] Filtros por categoria e preço
- [x] Visualização detalhada

### ✅ Carrinho
- [x] Adicionar/remover produtos
- [x] Atualizar quantidades
- [x] Cálculo automático do total
- [x] Sincronização com backend

### ✅ Pedidos
- [x] Finalização de compra
- [x] Escolha de método de pagamento
- [x] Endereço de entrega
- [x] Histórico de pedidos

### ✅ Admin (Backend)
- [x] CRUD de produtos
- [x] Gerenciamento de pedidos
- [x] Atualização de status

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| **Autenticação** |
| POST | `/api/auth/register` | Registrar usuário | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/me` | Obter perfil | ✅ |
| PUT | `/api/auth/profile` | Atualizar perfil | ✅ |
| **Produtos** |
| GET | `/api/products` | Listar produtos | ❌ |
| GET | `/api/products/:id` | Buscar produto | ❌ |
| POST | `/api/products` | Criar produto (admin) | ✅ |
| PUT | `/api/products/:id` | Atualizar produto (admin) | ✅ |
| DELETE | `/api/products/:id` | Deletar produto (admin) | ✅ |
| **Carrinho** |
| GET | `/api/cart` | Obter carrinho | ✅ |
| POST | `/api/cart/add` | Adicionar item | ✅ |
| PUT | `/api/cart/update/:id` | Atualizar quantidade | ✅ |
| DELETE | `/api/cart/remove/:id` | Remover item | ✅ |
| **Pedidos** |
| POST | `/api/orders` | Criar pedido | ✅ |
| GET | `/api/orders` | Listar pedidos | ✅ |
| GET | `/api/orders/:id` | Buscar pedido | ✅ |

**Documentação completa:** `backend/API_DOCUMENTATION.md`

---

## 🧪 Testando a Aplicação

### 1. Popular Banco de Dados
```bash
cd backend
npm run seed
```

Isso criará 5 produtos de exemplo.

### 2. Criar Usuário
- Acesse http://localhost:5173
- Clique em "Registrar"
- Preencha os dados
- Faça login

### 3. Testar Funcionalidades
1. **Produtos:**
   - Veja a lista de produtos
   - Use os filtros (categoria, busca)
   - Teste a paginação

2. **Carrinho:**
   - Adicione produtos ao carrinho
   - Altere quantidades
   - Remova itens

3. **Pedido:**
   - Vá para o carrinho
   - Clique em "Finalizar Compra"
   - Preencha o endereço
   - Escolha método de pagamento
   - Finalize o pedido

---

## 🐛 Troubleshooting

### MongoDB não conecta
**Problema:** `MongooseError: connect ECONNREFUSED`

**Solução:**
1. Verifique se o MongoDB está rodando: `mongod --version`
2. Inicie o MongoDB: `mongod` ou use MongoDB Atlas
3. Verifique `MONGODB_URI` no `.env`

### Backend não inicia
**Problema:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solução:**
- Porta 5000 está em uso
- Altere `PORT` no `.env` do backend
- Ou mate o processo: `netstat -ano | findstr :5000`

### Frontend não carrega dados
**Problema:** Network Error ou 404

**Solução:**
1. Verifique se backend está rodando (http://localhost:5000)
2. Verifique `VITE_API_URL` no `.env` do frontend
3. Abra DevTools (F12) → Network para ver erros

### Erro 401 (Unauthorized)
**Problema:** Token inválido ou expirado

**Solução:**
1. Faça logout e login novamente
2. Limpe localStorage do navegador
3. Verifique `JWT_SECRET` no backend

### CORS Error
**Problema:** `Access-Control-Allow-Origin`

**Solução:**
- Adicione `http://localhost:5173` em `ALLOWED_ORIGINS` no backend
- Reinicie o backend

---

## 📚 Documentação

- **[Integração Frontend ↔ Backend](./INTEGRACAO_FRONTEND_BACKEND.md)** - Guia completo
- **[API Documentation](./backend/API_DOCUMENTATION.md)** - Endpoints detalhados
- **[Backend README](./backend/README.md)** - Documentação do backend
- **[Análise Técnica](./backend/ANALISE_TECNICA.md)** - Análise do projeto

---

## 🎯 Scripts Disponíveis

### Backend
```bash
npm start        # Produção
npm run dev      # Desenvolvimento (com auto-reload)
npm run seed     # Popular banco de dados
```

### Frontend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

---

## 🔐 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ JWT com expiração de 24h
- ✅ Rate limiting (100 req/15min)
- ✅ Helmet para headers seguros
- ✅ CORS configurável
- ✅ Validação de dados
- ✅ Proteção contra ataques comuns

---

## 🚀 Deploy

### Backend (Heroku/Railway/Render)
1. Configure variáveis de ambiente
2. Altere `MONGODB_URI` para MongoDB Atlas
3. Altere `JWT_SECRET` para algo seguro
4. Configure `ALLOWED_ORIGINS` com domínio frontend

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Configure `VITE_API_URL` com URL do backend
3. Deploy pasta `dist/`

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais (TCC).

---

## 👥 Autor

**Ludmila Soares**

---

## 🎓 Próximos Passos

### Melhorias Futuras
- [ ] Página de histórico de pedidos
- [ ] Sistema de avaliações de produtos
- [ ] Chat de suporte
- [ ] Notificações em tempo real
- [ ] Painel administrativo (frontend)
- [ ] Upload de imagens de produtos
- [ ] Integração com gateway de pagamento real
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Relatórios e analytics

---

**🌱 Vereco - Produtos orgânicos com qualidade e sustentabilidade**

**Status do Projeto:** ✅ Completo e Funcional  
**Data:** Outubro 2025

---

## 📞 Suporte

Para problemas ou dúvidas:
1. Veja a seção **Troubleshooting** acima
2. Consulte a **Documentação** (links acima)
3. Abra uma **Issue** no GitHub

**Boa sorte com seu projeto! 🎉**
