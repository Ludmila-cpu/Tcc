# Backend - Deploy na Vercel

## Passos para Deploy:

### 1. Instalar Vercel CLI (opcional)
```bash
npm i -g vercel
```

### 2. Fazer Deploy

#### Opção A: Via Dashboard Vercel (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New" → "Project"
3. Importe o repositório `Ludmila-cpu/Tcc`
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)

5. Adicione as variáveis de ambiente:
   ```
   MONGODB_URI=mongodb+srv://vereco_user:Pacaembu1@cluster0.twfwgex.mongodb.net/?appName=Cluster0
   JWT_SECRET=minha_chave_secreta_super_segura_12345
   NODE_ENV=production
   ALLOWED_ORIGINS=https://seu-frontend.vercel.app
   ```

6. Clique em "Deploy"

#### Opção B: Via CLI
```bash
cd backend
vercel
```

### 3. Testar
Acesse: `https://seu-backend.vercel.app/health`

### 4. Atualizar Frontend
No frontend, atualize o `.env.production`:
```
VITE_API_URL=https://seu-backend.vercel.app
```

## Notas Importantes:

- ✅ O `vercel.json` já está configurado
- ✅ O `index.js` foi adaptado para serverless
- ✅ Não precisa de `package.json` na raiz (Vercel detecta automaticamente)
- ⚠️ Lembre-se de atualizar `ALLOWED_ORIGINS` com a URL do frontend depois do deploy
