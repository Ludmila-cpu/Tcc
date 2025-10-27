# 📊 Estrutura do Monorepo - Vereco

Documentação da estrutura de pastas do projeto após reorganização para monorepo.

## 🎯 Visão Geral

O projeto foi reorganizado em uma estrutura de **monorepo** com separação clara entre:

- **Frontend** (React + TypeScript + Vite)
- **Backend** (Node.js + Express + MongoDB)
- **Static** (Arquivos HTML legacy - depreciados)

---

## 📁 Estrutura Completa

```
📁 Tcc/ (Raiz do Monorepo)
│
├── 📁 frontend/                    # ⚛️ Aplicação React
│   ├── 📁 src/
│   │   ├── 📁 pages/              # Páginas da aplicação
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   └── PaymentPage.tsx
│   │   ├── 📁 assets/             # Imagens, ícones, etc.
│   │   │   └── 📁 products/
│   │   ├── App.tsx                # Componente raiz com rotas
│   │   ├── main.tsx               # Entry point
│   │   ├── index.css              # Estilos globais
│   │   ├── env.d.ts               # TypeScript definitions
│   │   └── index.html             # Template HTML (vazio)
│   │
│   ├── 📁 public/                 # Arquivos públicos estáticos
│   │   └── 📁 assets/
│   │
│   ├── 📁 node_modules/           # Dependências (git-ignored)
│   ├── 📄 package.json            # Dependências do frontend
│   ├── 📄 package-lock.json
│   ├── 📄 vite.config.ts          # Configuração Vite
│   ├── 📄 tsconfig.json           # Configuração TypeScript
│   ├── 📄 tsconfig.node.json      # TS config para Node
│   ├── 📄 tailwind.config.js      # Configuração Tailwind CSS
│   ├── 📄 postcss.config.js       # Configuração PostCSS
│   └── 📄 README.md               # Documentação do frontend
│
├── 📁 backend/                     # 🔧 API REST
│   ├── 📁 src/
│   │   ├── 📁 routes/             # Rotas da API
│   │   │   ├── auth.js            # Login, registro
│   │   │   ├── products.js        # CRUD de produtos
│   │   │   ├── cart.js            # Carrinho de compras
│   │   │   └── orders.js          # Pedidos
│   │   │
│   │   ├── 📁 models/             # Modelos do MongoDB
│   │   │   ├── User.js            # Schema de usuário
│   │   │   ├── Product.js         # Schema de produto
│   │   │   ├── Cart.js            # Schema de carrinho
│   │   │   └── Order.js           # Schema de pedido
│   │   │
│   │   ├── 📁 middleware/         # Middlewares customizados
│   │   │   └── auth.js            # Autenticação JWT
│   │   │
│   │   ├── index.js               # Entry point da API
│   │   └── seed.js                # Popular banco de dados
│   │
│   ├── 📁 node_modules/           # Dependências (git-ignored)
│   ├── 📄 package.json            # Dependências do backend
│   ├── 📄 package-lock.json
│   ├── 📄 Dockerfile              # Container Docker
│   ├── 📄 .env.example            # Template de variáveis
│   └── 📄 README.md               # Documentação do backend
│
├── 📁 static/                      # 📜 Arquivos HTML Legacy (Depreciado)
│   ├── index.html                 # Página inicial antiga
│   ├── login.html                 # Login HTML puro
│   ├── cadastro.html              # Cadastro HTML puro
│   ├── produtos.html              # Produtos HTML puro
│   ├── carrinho.html              # Carrinho HTML puro
│   ├── pagamento.html             # Pagamento HTML puro
│   ├── sobre.html                 # Sobre nós HTML puro
│   ├── home.html                  # Home alternativa
│   ├── styles.css                 # CSS vanilla
│   ├── script.js                  # JavaScript vanilla
│   ├── api.js                     # Cliente API vanilla
│   └── README.md                  # Documentação dos arquivos legacy
│
├── 📁 .git/                        # Controle de versão Git
│
├── 📄 README.md                    # 📖 Documentação principal
├── 📄 INSTALL.md                   # 🚀 Guia de instalação
├── 📄 STRUCTURE.md                 # 📊 Este arquivo
├── 📄 SCRIPTS.md                   # 📝 Documentação de scripts
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
│
├── 📄 start-dev.bat                # 🪟 Script Windows (CMD)
├── 📄 start-dev.ps1                # 🪟 Script Windows (PowerShell)
└── 📄 start-dev.sh                 # 🐧 Script Linux/Mac
```

---

## 🎨 Frontend (`frontend/`)

### Tecnologias

- React 19.1.1
- TypeScript 5.9.2
- Vite 7.1.4
- React Router DOM 7.8.2
- Tailwind CSS 3.3.3

### Comandos

```bash
cd frontend
npm install          # Instalar dependências
npm run dev          # Desenvolvimento (porta 5173)
npm run build        # Build de produção
npm run preview      # Preview da build
```

### Porta

- Desenvolvimento: `http://localhost:5173`

---

## ⚙️ Backend (`backend/`)

### Tecnologias

- Node.js 18+
- Express 4.18.2
- MongoDB 7.5.0
- Mongoose 7.5.0
- JWT 9.0.1

### Comandos

```bash
cd backend
npm install          # Instalar dependências
npm start            # Produção (porta 5000)
npm run dev          # Desenvolvimento com hot-reload
npm run seed         # Popular banco de dados
```

### Porta

- API: `http://localhost:5000`

### Endpoints Principais

- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/products` - Listar produtos
- `GET /api/cart` - Obter carrinho
- `POST /api/orders` - Criar pedido

---

## 📜 Static (`static/`)

### Status

⚠️ **DEPRECIADO** - Mantido apenas para referência

### Conteúdo

Versão antiga do projeto desenvolvida com:

- HTML puro
- CSS vanilla
- JavaScript vanilla

### Uso

Não deve ser usado para desenvolvimento ativo. Consulte `frontend/` e `backend/` para o código atual.

---

## 🚀 Scripts de Inicialização

### Windows

```bash
# Prompt de Comando
start-dev.bat

# PowerShell
.\start-dev.ps1
```

### Linux/Mac

```bash
chmod +x start-dev.sh
./start-dev.sh
```

Estes scripts iniciam automaticamente frontend e backend em terminais separados.

---

## 📦 Dependências

### Frontend

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.8.2",
  "typescript": "^5.9.2",
  "vite": "^7.1.4",
  "tailwindcss": "^3.3.3"
}
```

### Backend

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## 🔐 Variáveis de Ambiente

### Backend (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vereco
JWT_SECRET=seu_secret_aqui
NODE_ENV=development
```

### Frontend (`.env` - opcional)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 Documentação

| Arquivo              | Descrição                          |
| -------------------- | ---------------------------------- |
| `README.md`          | Documentação geral do projeto      |
| `INSTALL.md`         | Guia de instalação passo a passo   |
| `STRUCTURE.md`       | Estrutura de pastas (este arquivo) |
| `SCRIPTS.md`         | Documentação dos scripts           |
| `frontend/README.md` | Específico do frontend             |
| `backend/README.md`  | Específico do backend              |
| `static/README.md`   | Sobre arquivos legacy              |

---

## 🎯 Fluxo de Desenvolvimento

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Ludmila-cpu/Tcc.git
   cd Tcc
   ```

2. **Configure o backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edite .env com suas configurações
   npm run seed
   ```

3. **Configure o frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Inicie ambos**
   ```bash
   cd ..
   ./start-dev.bat  # Windows
   # ou
   ./start-dev.sh   # Linux/Mac
   ```

---

## 🔄 Migração da Estrutura Antiga

### O que foi movido:

**Para `frontend/`:**

- `src/` → `frontend/src/`
- `public/` → `frontend/public/`
- `package.json` (Vite/React) → `frontend/package.json`
- Configs: `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, etc.

**Para `backend/`:**

- `server/` → `backend/`
- Todo o conteúdo da pasta `server`

**Para `static/`:**

- Todos os arquivos `.html` da raiz
- `styles.css`, `script.js`, `api.js`

---

## ✅ Vantagens da Nova Estrutura

- ✅ **Organização clara** entre frontend, backend e legacy
- ✅ **Fácil navegação** e localização de arquivos
- ✅ **Isolamento de dependências** (cada parte tem seu `package.json`)
- ✅ **Melhor para Git** (commits mais organizados)
- ✅ **Escalabilidade** (fácil adicionar novos módulos)
- ✅ **Documentação separada** por contexto
- ✅ **Manutenção simplificada**

---

**Estrutura criada em:** 16 de outubro de 2025
**TCC:** Vereco - E-commerce de Produtos Orgânicos
