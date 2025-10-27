# 🚀 Guia de Deploy - Vereco E-commerce

Este guia explica como fazer o deploy do projeto Vereco (backend + frontend) usando Vercel (gratuito).

## 📋 Pré-requisitos

- [ ] Conta no [GitHub](https://github.com) ✅ (você já tem!)
- [ ] Conta no [Vercel](https://vercel.com) (gratuita)
- [ ] MongoDB Atlas configurado ✅ (você já tem!)

---

## 🔧 Parte 1: Preparação

### 1.1 Verificar que está tudo commitado

```bash
git status
# Se houver alterações:
git add .
git commit -m "Preparar projeto para deploy"
git push origin main
```

---

## 🖥️ Parte 2: Deploy do Backend na Vercel

### 2.1 Fazer Deploy do Backend

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New"** → **"Project"**
3. Selecione o repositório `Ludmila-cpu/Tcc`
4. Configure:
   - **Project Name**: `vereco-backend` (ou o que preferir)
   - **Framework Preset**: Other
   - **Root Directory**: `backend` ← **IMPORTANTE!**
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)
   - **Install Command**: `npm install`

### 2.2 Configurar Variáveis de Ambiente

Antes de clicar em "Deploy", adicione as variáveis de ambiente:

Clique em **"Environment Variables"** e adicione:

```
MONGODB_URI=mongodb+srv://vereco_user:Pacaembu1@cluster0.twfwgex.mongodb.net/?appName=Cluster0
JWT_SECRET=minha_chave_secreta_super_segura_12345
NODE_ENV=production
```

**IMPORTANTE:** Não adicione `ALLOWED_ORIGINS` agora. Você vai adicionar depois que tiver a URL do frontend.

### 2.3 Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (2-3 minutos)
3. Anote a URL do backend (será algo como: `https://vereco-backend.vercel.app`)

### 2.4 Testar o Backend

Acesse no navegador:
```
https://seu-backend.vercel.app/health
```

Você deve ver: `{"success":true,"status":"OK",...}`

---

## 🌐 Parte 3: Deploy do Frontend na Vercel

### 3.1 Atualizar Variável de Ambiente do Frontend

**ANTES de fazer deploy do frontend**, atualize o arquivo `.env.production`:

No seu projeto local:
```bash
# Edite: frontend/.env.production
VITE_API_URL=https://seu-backend.vercel.app
```

Substitua `seu-backend.vercel.app` pela URL real do backend (da Parte 2.3).

Faça commit:
```bash
git add frontend/.env.production
git commit -m "Atualizar URL do backend em produção"
git push origin main
```

### 3.2 Deploy na Vercel

1. Na Vercel, clique em **"Add New"** → **"Project"** novamente
2. Selecione o mesmo repositório `Ludmila-cpu/Tcc`
3. Configure:
   - **Project Name**: `vereco-frontend` (ou o que preferir)
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` ← **IMPORTANTE!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Em **"Environment Variables"**, adicione:
   ```
   VITE_API_URL=https://seu-backend.vercel.app
   ```

5. Clique em **"Deploy"**
6. Aguarde o deploy (2-5 minutos)

### 3.3 Anote a URL do Frontend

A Vercel vai dar uma URL tipo: `https://vereco-frontend.vercel.app`

---

## 🔄 Parte 4: Configurar CORS no Backend (IMPORTANTE!)

Agora que você tem a URL do frontend, precisa **atualizar o backend**:

1. Vá para o dashboard da Vercel
2. Acesse o projeto do **backend** (`vereco-backend`)
3. Vá em **Settings** → **Environment Variables**
4. **Adicione** uma nova variável:
   ```
   Name: ALLOWED_ORIGINS
   Value: https://vereco-frontend.vercel.app
   ```
   (Substitua pela URL real do seu frontend)

5. Clique em **"Save"**
6. Vá em **"Deployments"** e clique em "Redeploy" no último deployment

Aguarde o redeploy (1-2 minutos).

---

## ✅ Parte 5: Testar o Sistema Completo

1. Acesse seu site na URL do frontend: `https://vereco-frontend.vercel.app`
2. Crie uma conta nova
3. Faça login
4. Navegue pelos produtos
5. Adicione itens ao carrinho
6. Faça um pedido

🎉 Se tudo funcionar, seu sistema está no ar!

---

## 🔧 Comandos Úteis

### Atualizar o Deploy

Sempre que fizer mudanças no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

A Vercel fará **redeploy automático** de ambos (backend e frontend).

### Ver Logs

**Backend:**
1. Dashboard Vercel → Projeto backend → **Deployments**
2. Clique no último deploy → **View Function Logs**

**Frontend:**
1. Dashboard Vercel → Projeto frontend → **Deployments**
2. Clique no último deploy → Veja os logs de build

---

## 🐛 Troubleshooting

### Backend não conecta ao MongoDB

✅ **Solução:**
- No MongoDB Atlas, vá em **Network Access**
- Adicione `0.0.0.0/0` aos IPs permitidos (permite todos)

### Frontend não conecta ao Backend (CORS error)

✅ **Solução:**
- Verifique se `ALLOWED_ORIGINS` no backend tem a URL correta do frontend
- Certifique-se de fazer redeploy do backend após adicionar a variável

### Build do Frontend falha

✅ **Solução:**
- Verifique se `VITE_API_URL` está configurado
- Rode `npm run build` localmente para ver erros:
  ```bash
  cd frontend
  npm run build
  ```

### Erro 404 ao acessar rotas no frontend

✅ **Solução:**
- O `vercel.json` no frontend já está configurado com rewrites
- Se ainda der erro, verifique se o arquivo existe em `frontend/vercel.json`

---

## 📊 Custos

- **MongoDB Atlas**: Gratuito (512MB, cluster M0)
- **Vercel Backend**: Gratuito (100GB bandwidth/mês, serverless)
- **Vercel Frontend**: Gratuito (100GB bandwidth/mês)

**Total: R$ 0,00** 🎉

---

## 🎉 Pronto!

Seu e-commerce Vereco está no ar! 🚀

**URLs do seu projeto:**
- Frontend: `https://vereco-frontend.vercel.app`
- Backend: `https://vereco-backend.vercel.app`
- MongoDB: `cluster0.twfwgex.mongodb.net`

---

## 📝 Próximos Passos (Opcional)

- [ ] Configurar domínio customizado na Vercel (tipo: `www.vereco.com.br`)
- [ ] Adicionar Vercel Analytics
- [ ] Configurar email de confirmação (SendGrid)
- [ ] Implementar pagamentos (Stripe/Mercado Pago)
- [ ] Adicionar mais produtos via seed

---

## 💡 Dica Pro

**Monitorar logs em tempo real:**

Via Vercel CLI:
```bash
# Instalar CLI
npm i -g vercel

# Ver logs do backend
vercel logs https://seu-backend.vercel.app

# Ver logs do frontend  
vercel logs https://seu-frontend.vercel.app
```
NODE_ENV=production
ALLOWED_ORIGINS=https://seu-frontend.vercel.app
```

> ⚠️ **IMPORTANTE**: Substitua `https://seu-frontend.vercel.app` pela URL do seu frontend depois do deploy na Vercel (Parte 3).

### 2.3 Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build e deploy (5-10 minutos)
3. Anote a URL do backend (será algo como: `https://vereco-backend.onrender.com`)

### 2.4 Testar o Backend

Acesse no navegador:
```
https://seu-backend.onrender.com/health
```

Você deve ver: `{"success":true,"status":"OK",...}`

---

## 🌐 Parte 3: Deploy do Frontend (Vercel)

### 3.1 Configurar Variável de Ambiente

**ANTES de fazer o deploy**, você precisa criar um arquivo `.env.production` no frontend:

```bash
# No diretório frontend, crie o arquivo .env.production
VITE_API_URL=https://seu-backend.onrender.com
```

> ⚠️ Substitua pela URL real do seu backend do Render (da Parte 2.3)

Faça commit dessa mudança:
```bash
git add frontend/.env.production
git commit -m "Adicionar configuração de produção"
git push origin main
```

### 3.2 Deploy na Vercel

#### Opção A: Via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New"** → **"Project"**
3. Importe o repositório `Ludmila-cpu/Tcc`
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Em **"Environment Variables"**, adicione:
   ```
   VITE_API_URL=https://seu-backend.onrender.com
   ```

6. Clique em **"Deploy"**
7. Aguarde o deploy (2-5 minutos)

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# No diretório frontend
cd frontend

# Login
vercel login

# Deploy
vercel --prod
```

### 3.3 Testar o Frontend

Acesse a URL fornecida pela Vercel (algo como: `https://tcc-frontend.vercel.app`)

---

## 🔄 Parte 4: Configurar CORS (IMPORTANTE!)

Agora que você tem a URL do frontend, precisa **voltar ao Render** e atualizar o backend:

1. Acesse o painel do Render
2. Vá no seu serviço `vereco-backend`
3. Clique em **"Environment"**
4. Atualize a variável `ALLOWED_ORIGINS` com a URL real do Vercel:
   ```
   ALLOWED_ORIGINS=https://tcc-frontend.vercel.app
   ```
5. Salve e aguarde o redeploy automático

---

## ✅ Parte 5: Testar o Sistema Completo

1. Acesse seu site na Vercel
2. Crie uma conta nova
3. Faça login
4. Navegue pelos produtos
5. Adicione itens ao carrinho
6. Faça um pedido

---

## 🔧 Comandos Úteis

### Atualizar o Deploy

Sempre que fizer mudanças no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

- **Render**: Fará redeploy automático do backend
- **Vercel**: Fará redeploy automático do frontend

### Ver Logs do Backend

No painel do Render:
1. Vá no seu serviço
2. Clique em **"Logs"**

### Ver Logs do Frontend

No painel da Vercel:
1. Vá no seu projeto
2. Clique em **"Deployments"**
3. Clique no último deploy
4. Veja os logs de build

---

## 🐛 Troubleshooting

### Backend não conecta ao MongoDB

- Verifique se a variável `MONGODB_URI` está correta
- No MongoDB Atlas, adicione `0.0.0.0/0` aos IP whitelist (para permitir conexões do Render)

### Frontend não conecta ao Backend (CORS error)

- Verifique se `ALLOWED_ORIGINS` no backend inclui a URL do Vercel
- Certifique-se de que `VITE_API_URL` no frontend aponta para o backend correto

### Build do Frontend falha

- Verifique se todas as dependências estão no `package.json`
- Rode `npm run build` localmente para ver erros

### Backend não inicia

- Verifique os logs no Render
- Certifique-se de que todas as variáveis de ambiente estão configuradas
- Verifique se o `package.json` tem o script `start`

---

## 📊 Custos

- **MongoDB Atlas**: Gratuito (512MB)
- **Render**: Gratuito com limitações (sleep após 15min de inatividade)
- **Vercel**: Gratuito para uso pessoal

> ⚠️ **Nota sobre Render Free**: O serviço "dorme" após 15 minutos de inatividade. O primeiro acesso após isso pode levar 30-60 segundos para "acordar".

---

## 🎉 Pronto!

Seu e-commerce Vereco está no ar! 🚀

**URLs do seu projeto:**
- Frontend: `https://[seu-projeto].vercel.app`
- Backend: `https://[seu-projeto].onrender.com`
- MongoDB: `cluster0.twfwgex.mongodb.net`

---

## 📝 Próximos Passos (Opcional)

- [ ] Configurar domínio customizado na Vercel
- [ ] Adicionar analytics (Google Analytics, Vercel Analytics)
- [ ] Configurar email de confirmação de pedidos
- [ ] Adicionar sistema de pagamento (Stripe, Mercado Pago)
- [ ] Melhorar SEO com meta tags
