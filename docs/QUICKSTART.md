# ⚡ Guia Rápido - Vereco Monorepo

## 🚀 Início Rápido (5 minutos)

### 1. Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar Backend

```bash
cd backend
copy .env.example .env    # Windows
# OU
cp .env.example .env      # Linux/Mac

# Edite o .env com suas configurações
```

### 3. Iniciar Tudo

```bash
# Voltar para raiz
cd ..

# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

### 4. Acessar

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## 📁 Onde Está Cada Coisa?

| O que você precisa   | Onde encontrar            |
| -------------------- | ------------------------- |
| Páginas React        | `frontend/src/pages/`     |
| Componentes          | `frontend/src/`           |
| Rotas da API         | `backend/src/routes/`     |
| Modelos MongoDB      | `backend/src/models/`     |
| HTML antigos         | `static/`                 |
| Configuração Vite    | `frontend/vite.config.ts` |
| Configuração Express | `backend/src/index.js`    |

---

## 💻 Comandos Úteis

### Frontend

```bash
cd frontend
npm run dev      # Desenvolvimento
npm run build    # Build produção
```

### Backend

```bash
cd backend
npm run dev      # Desenvolvimento
npm start        # Produção
npm run seed     # Popular banco
```

---

## 🆘 Problemas Comuns

### Porta já em uso

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB não conecta

1. Verifique se MongoDB está rodando
2. Confira o `.env` do backend
3. Teste: `mongod --version`

### Frontend não carrega

1. Limpe cache: Ctrl+Shift+R
2. Verifique se backend está rodando
3. Reinstale: `rm -rf node_modules && npm install`

---

## 📖 Documentação Completa

- `README.md` - Visão geral
- `INSTALL.md` - Instalação detalhada
- `STRUCTURE.md` - Estrutura de pastas
- `SUMMARY.md` - Resumo da reorganização

---

**Pronto para desenvolver! 🚀**
