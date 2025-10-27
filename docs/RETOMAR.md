# 🚀 Guia de Retomada - TCC Vereco

## Para Iniciar o Projeto Novamente

### 1️⃣ Iniciar Backend
```powershell
cd C:\Users\ludmila_soares\Documents\GitHub\Tcc\server
npm start
```
✅ Deve mostrar: "Servidor rodando na porta 5000" e "Conectado ao MongoDB"

### 2️⃣ Iniciar Frontend
```powershell
cd C:\Users\ludmila_soares\Documents\GitHub\Tcc
npm run dev
```
✅ Deve abrir em: http://localhost:5173/

---

## 🔍 Próxima Tarefa: Corrigir Carrinho

### Debug do Problema
O carrinho aparece vazio mesmo adicionando produtos. Logs já foram adicionados.

### Como Testar:
1. Abra o navegador em http://localhost:5173/produtos.html
2. Pressione **F12** para abrir o Console
3. Digite no console:
   ```javascript
   localStorage.clear();
   ```
4. Recarregue a página (F5)
5. Clique em "Adicionar ao Carrinho" em algum produto
6. **Observe o console** - deve aparecer:
   - 🛒 addToCart chamado com ID: ...
   - ⚠️ Usuário não autenticado, usando localStorage
   - 🔍 Produto encontrado: {...}
   - 💾 Carrinho salvo: [...]

7. Acesse o carrinho: http://localhost:5173/carrinho.html
8. **Observe o console novamente**:
   - 🛒 Iniciando carrinho.html
   - 📦 localStorage.cart: ...
   - 📦 Cart parsed: ...

### O que procurar:
- ✅ Se o produto é salvo corretamente no localStorage
- ✅ Se o carrinho.html consegue ler os dados
- ❌ Se há algum erro JavaScript

---

## 📝 Login de Teste

**Email**: rogerio.michelpsicologia@gmail.com  
**Senha**: (a senha que você cadastrou)

Ou crie um novo usuário em: http://localhost:5173/cadastro.html

---

## 🗂️ Estrutura do Projeto

```
Tcc/
├── src/                    # Assets (imagens, logos)
├── server/
│   ├── src/
│   │   ├── models/        # User, Product, Order
│   │   ├── routes/        # auth, products, cart
│   │   └── seed.js        # 9 produtos
│   └── .env               # MongoDB credentials
├── index.html             # Home + Modal de Login
├── produtos.html          # Grid 3 colunas
├── carrinho.html          # Carrinho (COM BUGS)
├── pagamento.html         # Checkout
├── confirmacao.html       # Confirmação (NOVO)
├── historico.html         # Histórico (NOVO)
├── script.js              # Lógica principal
└── styles.css             # Estilos
```

---

## 📊 O que foi feito hoje (21/10/2025)

✅ Login corrigido e funcionando  
✅ 9 produtos com imagens reais cadastrados  
✅ Layout 3 colunas responsivo  
✅ Página de confirmação criada  
✅ Página de histórico criada  
✅ Sistema de pagamento integrado  
⚠️ Carrinho com bug (em investigação)

---

## 🎯 Próximos Passos

### Prioridade Alta:
1. ⏳ Corrigir carrinho (localStorage)
2. ⏳ Testar fluxo completo: produtos → carrinho → pagamento → confirmação

### Prioridade Média:
3. ⏳ Criar página "Sobre Nós"
4. ⏳ Adicionar filtros de produtos
5. ⏳ Melhorar responsividade mobile

### Opcional:
- Integrar carrinho com backend (quando autenticado)
- Adicionar busca de produtos
- Implementar recuperação de senha

---

## 💾 MongoDB Atlas

**Connection String**: mongodb+srv://vereco_user:Pacaembu1@cluster0.twfwgex.mongodb.net/vereco

**Collections**:
- users (com teste@vereco.com e rogerio.michelpsicologia@gmail.com)
- products (9 produtos)
- orders (vazio, aguardando teste)

---

## 🆘 Se algo não funcionar

### Backend não inicia:
```powershell
# Verificar se porta 5000 está ocupada
netstat -ano | findstr :5000

# Matar processo se necessário
Stop-Process -Id [PID] -Force
```

### Frontend não inicia:
```powershell
# Reinstalar dependências
npm install

# Limpar cache do Vite
npm run dev -- --force
```

### MongoDB não conecta:
- Verificar arquivo `server/.env`
- Confirmar senha: Pacaembu1
- Testar conexão: executar `npm run seed`

---

## 📚 Referências Rápidas

**Vite Dev Server**: http://localhost:5173/  
**Backend API**: http://localhost:5000/  
**MongoDB Atlas**: https://cloud.mongodb.com/

---

**Criado em**: 21/10/2025  
**Próxima sessão**: Continuar debug do carrinho
