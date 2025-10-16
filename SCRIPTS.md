# 🚀 Scripts de Inicialização - Vereco

Este diretório contém scripts para iniciar automaticamente o **Frontend** e **Backend** do projeto.

---

## 📁 Arquivos Disponíveis

| Arquivo | Sistema | Descrição |
|---------|---------|-----------|
| `start-dev.bat` | **Windows** | Abre 2 janelas CMD separadas (recomendado) |
| `start-dev.ps1` | **Windows** | PowerShell com jobs em background |
| `start-dev.sh` | **Linux/Mac/Git Bash** | Bash script com background processes |

---

## 🪟 Windows - Método 1 (RECOMENDADO)

### ✅ Usando o arquivo `.bat` (Duplo clique)

1. **Navegue até a pasta do projeto:**
   ```
   C:\Users\ludmila_soares\Documents\GitHub\Tcc
   ```

2. **Duplo clique no arquivo:**
   ```
   start-dev.bat
   ```

3. **Duas janelas abrirão:**
   - **Janela 1:** Backend (http://localhost:5000)
   - **Janela 2:** Frontend (http://localhost:5173)

4. **Para parar:**
   - Feche as janelas CMD ou pressione `Ctrl+C` em cada uma

---

## 🪟 Windows - Método 2 (PowerShell)

### ✅ Usando o arquivo `.ps1`

1. **Abra PowerShell na pasta do projeto**

2. **Execute o script:**
   ```powershell
   .\start-dev.ps1
   ```

3. **Se der erro de execução:**
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\start-dev.ps1
   ```

4. **Para parar:**
   - Pressione `Ctrl+C`

---

## 🐧 Linux / Mac / Git Bash

### ✅ Usando o arquivo `.sh`

1. **Dê permissão de execução (primeira vez):**
   ```bash
   chmod +x start-dev.sh
   ```

2. **Execute o script:**
   ```bash
   ./start-dev.sh
   ```

3. **Para parar:**
   - Pressione `Ctrl+C`

---

## ⚡ Método Manual (Alternativa)

Se os scripts não funcionarem, você pode iniciar manualmente:

### Terminal 1 - Backend
```bash
cd server
npm start
```

### Terminal 2 - Frontend
```bash
npm run dev
```

---

## 🌐 URLs dos Serviços

Após iniciar os scripts, acesse:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:5173 | Interface do usuário (Vite) |
| **Backend API** | http://localhost:5000 | API REST (Express) |
| **Health Check** | http://localhost:5000/ | Verificar se API está online |

---

## 🔧 Troubleshooting

### ❌ Erro: "Porta já em uso"

**Problema:** Algum processo está usando a porta 5000 ou 5173

**Solução Windows:**
```powershell
# Matar processo na porta 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Matar processo na porta 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Solução Linux/Mac:**
```bash
# Matar processo na porta 5000
lsof -ti:5000 | xargs kill -9

# Matar processo na porta 5173
lsof -ti:5173 | xargs kill -9
```

---

### ❌ Erro: "Cannot find module"

**Problema:** Dependências não instaladas

**Solução:**
```bash
# Na raiz do projeto (frontend)
npm install

# Na pasta server (backend)
cd server
npm install
```

---

### ❌ Erro: "MongoDB connection failed"

**Problema:** Arquivo `.env` não configurado ou credenciais incorretas

**Solução:**
1. Verifique se existe `server/.env`
2. Confirme as credenciais do MongoDB Atlas
3. Verifique a connection string

---

## 📊 Status dos Serviços

Quando tudo estiver funcionando, você verá:

### ✅ Backend
```
Servidor rodando na porta 5000
Conectado ao MongoDB
```

### ✅ Frontend
```
VITE v7.1.4  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🎯 Próximos Passos

1. ✅ Iniciar os servidores com os scripts
2. 📱 Acessar http://localhost:5173
3. 🧪 Testar cadastro de usuário
4. 🛒 Testar navegação e carrinho
5. 💳 Testar checkout

---

## 💡 Dicas

- **Mantenha as janelas abertas** enquanto desenvolve
- **Vite faz hot-reload** automático no frontend
- **Nodemon faz restart** automático no backend (se usar `npm run dev`)
- **Verifique sempre o console** para ver erros

---

**Desenvolvido por Ludmila Soares - TCC 2025** 🚀
