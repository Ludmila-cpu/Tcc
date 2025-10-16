# 🚀 Guia de Instalação - Vereco E-commerce

Guia completo para configurar e executar o projeto Vereco em sua máquina.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v18 ou superior ([Download](https://nodejs.org/))
- **MongoDB** v7.0 ou superior ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/))
- **npm** ou **yarn** (vem com Node.js)

### Verificar instalações

```bash
node --version   # v18.x.x ou superior
npm --version    # 9.x.x ou superior
mongod --version # v7.0.x ou superior
git --version    # 2.x.x ou superior
```

---

## 📥 Clone do Repositório

```bash
git clone https://github.com/Ludmila-cpu/Tcc.git
cd Tcc
```

---

## 🗄️ Configurar MongoDB

### Opção 1: MongoDB Local

1. Inicie o MongoDB:

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

2. Verifique se está rodando:

```bash
mongo --eval "db.version()"
```

### Opção 2: MongoDB com Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Opção 3: MongoDB Atlas (Nuvem)

1. Crie uma conta gratuita em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster
3. Obtenha a connection string
4. Use no `.env` do backend

---

## ⚙️ Configurar Backend

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
copy .env.example .env    # Windows
# ou
cp .env.example .env      # Linux/Mac
```

### Editar `.env` do Backend

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vereco
JWT_SECRET=seu_secret_super_seguro_aqui_min_32_caracteres
NODE_ENV=development
```

### Popular banco de dados (opcional)

```bash
npm run seed
```

---

## 🎨 Configurar Frontend

```bash
# Voltar para raiz e entrar no frontend
cd ..
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env (opcional)
copy .env.example .env    # Windows
# ou
cp .env.example .env      # Linux/Mac
```

### Editar `.env` do Frontend (opcional)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Executar o Projeto

### Opção 1: Script Automático (Recomendado)

#### Windows (Prompt de Comando)

```bash
# Voltar para raiz do projeto
cd ..

# Executar script
start-dev.bat
```

#### Windows (PowerShell)

```powershell
# Voltar para raiz do projeto
cd ..

# Executar script
.\start-dev.ps1
```

#### Linux/Mac

```bash
# Voltar para raiz do projeto
cd ..

# Dar permissão de execução
chmod +x start-dev.sh

# Executar script
./start-dev.sh
```

### Opção 2: Execução Manual

#### Terminal 1 - Backend

```bash
cd backend
npm start
# ou para desenvolvimento com hot-reload
npm run dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

---

## 🌐 Acessar a Aplicação

Após iniciar, acesse:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api

---

## 🧪 Testar a Instalação

### 1. Testar Backend

```bash
# Teste simples
curl http://localhost:5000

# Deve retornar: {"message": "API Vereco funcionando!"}
```

### 2. Testar Frontend

Abra http://localhost:5173 no navegador e você deve ver a página de login.

### 3. Testar Conexão MongoDB

```bash
# No diretório backend
npm run seed
# Deve popular o banco sem erros
```

---

## 🐳 Executar com Docker (Opcional)

```bash
# Na raiz do projeto
docker-compose up -d

# Para parar
docker-compose down
```

---

## 🛠️ Scripts Disponíveis

### Backend

```bash
npm start      # Iniciar servidor (produção)
npm run dev    # Iniciar com hot-reload (desenvolvimento)
npm run seed   # Popular banco de dados
```

### Frontend

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

---

## ❗ Solução de Problemas

### Erro: "EADDRINUSE" ou "Porta já em uso"

```bash
# Windows - liberar porta 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac - liberar porta 5000
lsof -ti:5000 | xargs kill -9
```

### Erro: "MongoNetworkError" ou "ECONNREFUSED"

- Verifique se o MongoDB está rodando
- Confirme a string de conexão no `.env`
- Verifique firewall/antivírus

### Erro: "npm ERR! missing script"

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro de CORS no navegador

- Verifique se o backend está rodando
- Confirme a configuração de CORS no backend
- Limpe o cache do navegador

---

## 📚 Estrutura de Pastas

```
Tcc/
├── backend/          # API Node.js + Express
├── frontend/         # Aplicação React + Vite
├── static/           # Arquivos HTML legacy
├── README.md         # Documentação principal
├── INSTALL.md        # Este arquivo
├── start-dev.bat     # Script Windows (CMD)
├── start-dev.ps1     # Script Windows (PowerShell)
└── start-dev.sh      # Script Linux/Mac
```

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os pré-requisitos
2. Consulte a seção "Solução de Problemas"
3. Revise os logs de erro
4. Abra uma issue no GitHub

---

## ✅ Checklist de Instalação

- [ ] Node.js instalado (v18+)
- [ ] MongoDB rodando
- [ ] Repositório clonado
- [ ] Dependências do backend instaladas
- [ ] Dependências do frontend instaladas
- [ ] Arquivo `.env` configurado no backend
- [ ] Banco de dados populado (seed)
- [ ] Backend rodando sem erros
- [ ] Frontend acessível no navegador
- [ ] Login funcionando

---

**Pronto! Seu ambiente de desenvolvimento está configurado! 🎉**
