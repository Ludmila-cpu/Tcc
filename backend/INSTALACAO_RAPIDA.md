# ⚡ Guia Rápido de Instalação - API Vereco

## 🚀 Instalação em 5 Minutos

### Passo 1: Instalar Dependências

**Se tiver erro de permissão no PowerShell, execute como Administrador:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Depois instale:**
```bash
cd backend
npm install
```

---

### Passo 2: Verificar MongoDB

**Opção A: MongoDB Local**
```bash
# Verificar se está rodando
mongod --version

# Iniciar MongoDB (se necessário)
mongod
```

**Opção B: MongoDB Atlas (Recomendado)**
1. Acesse [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um cluster
4. Obtenha a connection string
5. Atualize no `.env`:
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/vereco
```

---

### Passo 3: Configurar Variáveis de Ambiente

O arquivo `.env` já está criado! Verifique se está tudo certo:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vereco
JWT_SECRET=vereco_jwt_secret_2024_change_in_production
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**⚠️ IMPORTANTE:** Em produção, altere o `JWT_SECRET` para algo seguro!

---

### Passo 4: Popular o Banco de Dados

```bash
npm run seed
```

**Saída esperada:**
```
✓ Conectado ao MongoDB
✓ Produtos antigos removidos
✓ 5 produtos inseridos com sucesso!

Produtos cadastrados:
1. Maçã Orgânica - R$ 7.90 (50 kg)
2. Banana Nanica - R$ 5.50 (80 kg)
3. Cenoura - R$ 4.20 (100 kg)
4. Tomate Italiano - R$ 8.40 (60 kg)
5. Alface Crespa - R$ 3.90 (40 un)
```

---

### Passo 5: Iniciar o Servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

**Saída esperada:**
```
✓ Conectado ao MongoDB
✓ Servidor rodando na porta 5000
✓ Ambiente: development
```

---

## ✅ Verificar se Está Funcionando

### Teste 1: Health Check
```bash
curl http://localhost:5000/health
```

**Resposta:**
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2025-10-17T12:00:00.000Z",
  "uptime": 10
}
```

### Teste 2: Listar Produtos
```bash
curl http://localhost:5000/api/products
```

**Resposta:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "...",
      "name": "Maçã Orgânica",
      "price": 7.90,
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalProducts": 5,
    "limit": 10
  }
}
```

### Teste 3: Registrar Usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Teste\",\"email\":\"teste@example.com\",\"password\":\"senha123\"}"
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎯 Próximos Passos

1. ✅ Testar todos os endpoints com Postman/Insomnia
2. ✅ Ler a documentação em `API_DOCUMENTATION.md`
3. ✅ Integrar com o frontend React
4. ✅ Personalizar conforme necessário

---

## 🐛 Problemas Comuns

### "npm não é reconhecido"
**Solução:** Instale o Node.js de [nodejs.org](https://nodejs.org/)

### "Erro ao conectar ao MongoDB"
**Solução:** 
- Verifique se o MongoDB está rodando: `mongod`
- Ou use MongoDB Atlas (veja Passo 2)

### "Execution of scripts is disabled"
**Solução (PowerShell como Admin):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Port 5000 already in use"
**Solução:** 
- Altere a porta no `.env`: `PORT=5001`
- Ou mate o processo na porta 5000

### "Token inválido"
**Solução:** 
- Faça login novamente para obter um novo token
- Tokens expiram em 24 horas

---

## 📚 Documentação Completa

- **README.md** - Guia completo do projeto
- **API_DOCUMENTATION.md** - Documentação de todos os endpoints
- **MELHORIAS_IMPLEMENTADAS.md** - Resumo das melhorias
- **ANALISE_TECNICA.md** - Análise técnica completa

---

## 🎉 Pronto!

Sua API está rodando em: **http://localhost:5000**

### Endpoints Disponíveis:
- `GET /` - Informações da API
- `GET /health` - Health check
- `GET /api/products` - Listar produtos
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- E muitos mais... (veja API_DOCUMENTATION.md)

**Boa sorte com seu projeto! 🚀**
